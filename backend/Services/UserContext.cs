using System.Security.Claims;
using backend.Interfaces;

namespace backend.Services
{
    public class UserContext : IUserContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserContext(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int UserId
        {
            get
            {
                var httpContext = _httpContextAccessor.HttpContext;

                var claim = httpContext?.User?.FindFirst(ClaimTypes.NameIdentifier);

                if (claim == null)
                    throw new UnauthorizedAccessException("User ID not found in token.");

                if (!int.TryParse(claim.Value, out var id))
                    throw new UnauthorizedAccessException("User ID is not a valid integer.");

                return id;
            }
        }
    }
}
