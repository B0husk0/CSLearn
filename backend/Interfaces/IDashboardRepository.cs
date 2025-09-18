using backend.Models;

namespace backend.Interfaces;

public interface IDashboardRepository
{
    Task<IEnumerable<UserProgressDto>> GetAllUserProgressAsync();
    Task<IEnumerable<UserProgressDto>> GetOrganizationUserProgressAsync(int organizationId);
    Task<int> GetOrganizationIdForUserAsync(int userId);
}

