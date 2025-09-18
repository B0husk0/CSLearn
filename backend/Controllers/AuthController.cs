using backend.Enums;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Authorization;
using Microsoft.AspNetCore.Authorization;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly PasswordService _passwordService;
        private readonly IUserContext _userContext;
        private readonly IAuthorizationService _authorizationService;

        private bool IsPasswordStrong(string password)
        {
            if (string.IsNullOrWhiteSpace(password) || password.Length < 8)
                return false;

            var hasUpper = password.Any(char.IsUpper);
            var hasLower = password.Any(char.IsLower);
            var hasDigit = password.Any(char.IsDigit);
            var hasSpecial = password.Any(ch => "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~".Contains(ch));

            return hasUpper && hasLower && hasDigit && hasSpecial;
        }


        public AuthController(IUserRepository userRepository, IConfiguration configuration, PasswordService passwordService)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _passwordService = passwordService;
        }

        [RoleAuthorize(RolePolicy.Admin)]
        [HttpGet("test-role")]
        public IActionResult TestRole()
        {
            return Ok("Prístup povolený");
        }

        [HttpGet("is-admin-direct")]
        public IActionResult IsAdminDirect()
        {
            var claim = HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);

            if (claim == null)
                return Unauthorized(new { error = "UserId claim not found." });

            if (!int.TryParse(claim.Value, out var userId))
                return BadRequest(new { error = "Invalid UserId format." });

            return Ok(new { userId });
        }

        [HttpGet("test-admin-policy")]
        public async Task<IActionResult> TestAdminPolicy()
        {
            var result = await _authorizationService.AuthorizeAsync(User, null, RolePolicy.Admin);

            if (!result.Succeeded)
                return Forbid();

            return Ok(new { message = "User is authorized as Admin." });
        }



        // Register Endpoint
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                if (request.Password != request.RepeatPassword)
                    return BadRequest(new { Message = "Passwords do not match." });

                if (!IsPasswordStrong(request.Password))
                    return BadRequest(new
                    {
                        Message = "Password is too weak. It must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character."
                    });

                var normalizedEmail = request.Email.Trim().ToLower();

                var existingUser = await _userRepository.GetUserByEmailAsync(normalizedEmail);
                if (existingUser != null)
                    return Conflict(new { Message = "Email is already registered." });

                var hashedPassword = _passwordService.HashPassword(request.Password);

                var newUser = new User
                {
                    Email = normalizedEmail,
                    PasswordHash = hashedPassword,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    CreatedAt = DateTime.UtcNow
                };

                // Vloženie používateľa a získanie ID
                var userId = await _userRepository.AddUserAsync(newUser);
                newUser.UserId = userId;

                // Priradenie do organizácie podľa domény
                var domain = normalizedEmail.Split('@').Last();
                var genericDomains = new[] { "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "zoho.com" };

                if (!genericDomains.Contains(domain))
                {
                    var org = await _userRepository.GetOrganizationByDomainAsync(domain);
                    int orgId;

                    if (org != null)
                    {
                        orgId = org.OrganizationId;
                    }
                    else
                    {
                        orgId = await _userRepository.CreateOrganizationAsync(new Organization
                        {
                            OrganizationName = domain.Split('.').First().ToUpper(),
                            Domain = domain,
                            CreatedAt = DateTime.UtcNow
                        });
                    }

                    await _userRepository.AssignUserToOrganizationAsync(userId, orgId, RoleType.BasicUser);
                }

                return Ok(new { Message = "User registered successfully." });
            }
            catch (Exception ex)
            {
                // Log error if you have logging system, e.g. _logger.LogError(ex, "Register failed");
                return StatusCode(500, new
                {
                    Message = "An internal server error occurred during registration.",
                    Detail = ex.Message // Optional, can be removed in production
                });
            }
        }



        // Login Endpoint
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userRepository.GetUserByEmailAsync(request.Email);
            if (user == null || !_passwordService.VerifyPassword(request.Password, user.PasswordHash))
                return Unauthorized(new { Message = "Invalid email or password." });

            var token = await GenerateJwtToken(user, request.RememberMe);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = request.RememberMe
                    ? DateTimeOffset.UtcNow.AddHours(1)
                    : DateTimeOffset.UtcNow.AddMinutes(10)
            };

            Response.Cookies.Append("auth_token", token, cookieOptions);

            return Ok(new
            {
                Message = "Login successful.",
                Token = token
            });
        }


        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("auth_token");
            return Ok(new { Message = "Logged out successfully." });
        }


        // Generate JWT Token
        private async Task<string> GenerateJwtToken(User user, bool rememberMe)
        {
            var jwtKey = _configuration["Jwt:Key"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            string role;

            if (user.IsAdmin.GetValueOrDefault())
            {
                role = RoleType.Admin.ToString();
            }
            else
            {
                var userOrg = await _userRepository.GetMainUserOrganizationAsync(user.UserId);
                role = userOrg?.RoleType.ToString() ?? RoleType.BasicUser.ToString();
            }


            var claims = new[]
            {
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
        new Claim("UserId", user.UserId.ToString()),
        new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
        new Claim(ClaimTypes.Role, role)
    };

            var expiration = rememberMe ? DateTime.UtcNow.AddHours(1) : DateTime.UtcNow.AddMinutes(10);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }


}


