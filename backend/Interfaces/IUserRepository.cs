using backend.Enums;
using backend.Models;

namespace backend.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task<int> AddUserAsync(User user);
        Task<User?> GetUserWithOrganizationsAsync(int userId);
        Task<User?> GetByIdAsync(int userId);
        Task UpdateUserProfileAsync(int userId, string firstName, string lastName, string email);
        Task UpdateUserImageUrlAsync(int userId, string imageUrl);
        Task<UserProfile?> GetUserProfileAsync(int userId);
        Task DeleteUserImageUrlAsync(int userId);
        Task<UserOrganization?> GetMainUserOrganizationAsync(int userId);

        Task<Organization?> GetOrganizationByDomainAsync(string domain);
        Task<int> CreateOrganizationAsync(Organization org);
        Task AssignUserToOrganizationAsync(int userId, int organizationId, RoleType role);


    }
}
