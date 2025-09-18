using backend.Enums;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseService _databaseService;

        public UserRepository(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            const string query = "API_GetUserByEmail";
            using var connection = _databaseService.CreateConnection();
            return await connection.QuerySingleOrDefaultAsync<User>(
                query,
                new { Email = email },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<UserOrganization?> GetMainUserOrganizationAsync(int userId)
        {
            using var connection = _databaseService.CreateConnection();
            var sql = @"
        SELECT TOP 1 
            OrganizationId,
            RoleTypeId AS RoleType
        FROM UserOrganization
        WHERE UserId = @UserId
        ORDER BY RoleTypeId ASC";
            return await connection.QueryFirstOrDefaultAsync<UserOrganization>(sql, new { userId });
        }



        public async Task<int> AddUserAsync(User user)
        {
            const string query = "API_AddUser";
            using var connection = _databaseService.CreateConnection();

            var parameters = new
            {
                user.Email,
                user.PasswordHash,
                user.FirstName,
                user.LastName,
                user.CreatedAt
            };

            return await connection.ExecuteScalarAsync<int>(query, parameters, commandType: CommandType.StoredProcedure);
        }


        public async Task<User?> GetUserWithOrganizationsAsync(int userId)
        {
            const string query = "API_GetUserWithOrganizations";
            using var connection = _databaseService.CreateConnection();

            var lookup = new Dictionary<int, User>();

            var result = await connection.QueryAsync<User, UserOrganization, User>(
                query,
                (user, org) =>
                {
                    if (!lookup.TryGetValue(user.UserId, out var userEntry))
                    {
                        userEntry = user;
                        userEntry.UserOrganizations = new List<UserOrganization>();
                        lookup.Add(user.UserId, userEntry);
                    }

                    if (org != null && org.OrganizationId != 0)
                    {
                        userEntry.UserOrganizations.Add(org);
                    }

                    return userEntry;
                },
                new { UserId = userId },
                splitOn: "OrganizationId",
                commandType: CommandType.StoredProcedure
            );

            return result.FirstOrDefault();
        }

        public async Task<User?> GetByIdAsync(int userId)
        {
            const string query = "API_GetUserById";
            using var connection = _databaseService.CreateConnection();

            return await connection.QuerySingleOrDefaultAsync<User>(
                query,
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task UpdateUserProfileAsync(int userId, string firstName, string lastName, string email)
        {
            const string query = "API_UpdateUserProfile";
            using var connection = _databaseService.CreateConnection();

            await connection.ExecuteAsync(
                query,
                new { UserId = userId, FirstName = firstName, LastName = lastName, Email = email },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task UpdateUserImageUrlAsync(int userId, string imageUrl)
        {
            const string query = "API_UpdateUserImageUrl";
            using var connection = _databaseService.CreateConnection();

            await connection.ExecuteAsync(
                query,
                new { UserId = userId, ImageUrl = imageUrl },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task RemoveUserImageUrlAsync(int userId)
        {
            const string query = "API_RemoveUserImageUrl";
            using var connection = _databaseService.CreateConnection();

            await connection.ExecuteAsync(
                query,
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<UserProfile?> GetUserProfileAsync(int userId)
        {
            const string query = "API_GetUserProfile";

            using var connection = _databaseService.CreateConnection();
            using var multi = await connection.QueryMultipleAsync(query, new { UserId = userId }, commandType: CommandType.StoredProcedure);

            var profile = await multi.ReadSingleOrDefaultAsync<UserProfile>();
            if (profile == null) return null;

            var stats = await multi.ReadSingleOrDefaultAsync<(int ModulesCompleted, int TotalModules, double? AvgScore)>();
            if (stats != default)
            {
                profile.ModulesCompleted = stats.ModulesCompleted;
                profile.TotalModules = stats.TotalModules;
                profile.AverageQuizScore = stats.AvgScore;
            }

            var achievements = (await multi.ReadAsync<Achievement>()).ToList();
            profile.Achievements = achievements;

            return profile;
        }

        public async Task DeleteUserImageUrlAsync(int userId)
        {
            const string query = "UPDATE Users SET ImageUrl = NULL WHERE UserId = @UserId";
            using var connection = _databaseService.CreateConnection();
            await connection.ExecuteAsync(query, new { UserId = userId });
        }

        public async Task<Organization?> GetOrganizationByDomainAsync(string domain)
        {
            const string sql = "SELECT TOP 1 * FROM Organization WHERE Domain = @Domain";
            using var conn = _databaseService.CreateConnection();
            return await conn.QuerySingleOrDefaultAsync<Organization>(sql, new { Domain = domain });
        }

        public async Task<int> CreateOrganizationAsync(Organization org)
        {
            const string sql = @"
        INSERT INTO Organization (OrganizationName, Domain, CreatedAt)
        OUTPUT INSERTED.OrganizationId
        VALUES (@OrganizationName, @Domain, @CreatedAt)";
            using var conn = _databaseService.CreateConnection();
            return await conn.ExecuteScalarAsync<int>(sql, org);
        }

        public async Task AssignUserToOrganizationAsync(int userId, int organizationId, RoleType role)
        {
            const string sql = "INSERT INTO UserOrganization (UserId, OrganizationId, RoleTypeId) VALUES (@UserId, @OrganizationId, @RoleType)";
            using var conn = _databaseService.CreateConnection();
            await conn.ExecuteAsync(sql, new { UserId = userId, OrganizationId = organizationId, RoleType = (int)role });
        }


    }


}
