namespace backend.Interfaces;

public interface IImageStorageService
{
    Task<string> UploadUserProfileImageAsync(int userId, IFormFile file);
}
