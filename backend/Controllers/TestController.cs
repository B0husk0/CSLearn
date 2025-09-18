using backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/test")]
public class TestController : ControllerBase
{
    private readonly IImageStorageService _imageStorage;
    private readonly IUserContext _userContext;

    public TestController(IImageStorageService imageStorage, IUserContext userContext)
    {
        _imageStorage = imageStorage;
        _userContext = userContext;
    }

    [HttpPost("upload-image")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        var imageUrl = await _imageStorage.UploadUserProfileImageAsync(_userContext.UserId, file);

        return Ok(new
        {
            message = "Upload successful",
            imageUrl
        });
    }
}
