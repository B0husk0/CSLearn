using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using backend.Interfaces;

namespace backend.Services;

public class AzureImageStorageService : IImageStorageService
{
    private readonly BlobContainerClient _container;

    public AzureImageStorageService(IConfiguration configuration)
    {
        var connectionString = configuration["AzureBlob:ConnectionString"]
            ?? throw new InvalidOperationException("Missing Azure Blob connection string.");

        var containerName = configuration["AzureBlob:ContainerName"]
            ?? "profiles";

        _container = new BlobContainerClient(connectionString, containerName);
        _container.CreateIfNotExists(PublicAccessType.Blob); // umožní čítanie obrázkov verejne
    }

    public async Task<string> UploadUserProfileImageAsync(int userId, IFormFile file)
    {
        var extension = Path.GetExtension(file.FileName)?.ToLowerInvariant();
        if (string.IsNullOrWhiteSpace(extension) || !(extension == ".jpg" || extension == ".jpeg" || extension == ".png"))
            throw new InvalidOperationException("Only .jpg, .jpeg, or .png files are allowed.");

        var blobName = $"user_{userId}{extension}";
        var blobClient = _container.GetBlobClient(blobName);

        await using var stream = file.OpenReadStream();

        var options = new BlobUploadOptions
        {
            HttpHeaders = new BlobHttpHeaders
            {
                ContentType = file.ContentType
            }
        };

        await blobClient.UploadAsync(stream, options);

        return blobClient.Uri.ToString();
    }

}
