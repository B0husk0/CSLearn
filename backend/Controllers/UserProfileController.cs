using backend.InputModels;
using backend.Interfaces;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/user-profile")]
[Authorize]
public class UserProfileController : ControllerBase
{
    private readonly IUserContext _userContext;
    private readonly IUserRepository _userRepository;
    private readonly IImageStorageService _imageStorage;
    private readonly IAchievementService _achievementService;

    public UserProfileController(
        IUserContext userContext,
        IUserRepository userRepository,
        IImageStorageService imageStorage,
        IAchievementService achievementService)
    {
        _userContext = userContext;
        _userRepository = userRepository;
        _imageStorage = imageStorage;
        _achievementService = achievementService;
    }

    //[HttpGet]
    //public async Task<IActionResult> GetProfile()
    //{
    //    var profile = await _userRepository.GetUserProfileAsync(_userContext.UserId);
    //    if (profile == null) return NotFound();

    //    return Ok(profile);
    //}


    [HttpPut]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserProfileInput input)
    {
        await _userRepository.UpdateUserProfileAsync(
            _userContext.UserId,
            input.FirstName,
            input.LastName,
            input.Email
        );

        return NoContent();
    }

    [HttpDelete("image")]
    public async Task<IActionResult> DeleteProfileImage()
    {
        await _userRepository.DeleteUserImageUrlAsync(_userContext.UserId);
        return NoContent();
    }

    [HttpPost("image")]
    public async Task<IActionResult> UploadProfileImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var imageUrl = await _imageStorage.UploadUserProfileImageAsync(_userContext.UserId, file);

        await _userRepository.UpdateUserImageUrlAsync(_userContext.UserId, imageUrl);

        return Ok(new { imageUrl });
    }

    [HttpGet]
    public async Task<IActionResult> GetUserProfile()
    {
        await _achievementService.CheckAndGrantAsync(_userContext.UserId);
        var profile = await _userRepository.GetUserProfileAsync(_userContext.UserId);
        if (profile == null) return NotFound();
        return Ok(profile);
    }




}
