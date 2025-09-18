using backend.Models;

namespace backend.Interfaces
{
    public interface IUserProgressRepository
    {
        Task<IEnumerable<UserModuleProgress>> GetUserProgressAsync(int userId);
        Task UpdateUserProgressAsync(int userId, int moduleId, int progress);
        Task<int> GetCompletedModuleCount(int userId);
    }
}
