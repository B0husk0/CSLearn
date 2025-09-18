using backend.Interfaces;
using backend.Models;
using backend.Enums;
using Dapper;
using System.Data;
using backend.Services;

namespace backend.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly DatabaseService _databaseService;

        public DashboardRepository(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public async Task<IEnumerable<UserProgressDto>> GetAllUserProgressAsync()
        {
            using var connection = _databaseService.CreateConnection();
            const string query = "API_GetAllUserProgress";

            var result = await connection.QueryAsync<UserProgressRawDto>(query, commandType: CommandType.StoredProcedure);

            return result.Select(r => new UserProgressDto
            {
                UserId = r.UserId,
                FullName = r.FullName,
                Email = r.Email,
                OrganizationName = r.OrganizationName,
                ModulesCompleted = r.ModulesCompleted,
                TotalModules = r.TotalModules,
                QuizAverage = r.QuizAverage,
                AchievementsCount = r.AchievementsCount,
                Role = (RoleType)r.RoleTypeId
            });
        }

        public async Task<int> GetOrganizationIdForUserAsync(int userId)
        {
            using var connection = _databaseService.CreateConnection();
            const string sql = "SELECT TOP 1 OrganizationId FROM UserOrganization WHERE UserId = @UserId";

            var organizationId = await connection.ExecuteScalarAsync<int>(sql, new { UserId = userId });
            return organizationId;
        }


        public async Task<IEnumerable<UserProgressDto>> GetOrganizationUserProgressAsync(int organizationId)
        {
            using var connection = _databaseService.CreateConnection();
            const string query = "API_GetOrganizationUserProgress";

            var result = await connection.QueryAsync<UserProgressRawDto>(
                query,
                new { OrganizationId = organizationId },
                commandType: CommandType.StoredProcedure);

            return result.Select(r => new UserProgressDto
            {
                UserId = r.UserId,
                FullName = r.FullName,
                Email = r.Email,
                OrganizationName = r.OrganizationName,
                ModulesCompleted = r.ModulesCompleted,
                TotalModules = r.TotalModules,
                QuizAverage = r.QuizAverage,
                AchievementsCount = r.AchievementsCount,
                Role = (RoleType)r.RoleTypeId
            });
        }
    }

}
