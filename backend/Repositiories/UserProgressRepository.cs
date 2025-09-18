using backend.Interfaces;
using backend.Models;
using backend.Services;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class UserProgressRepository : IUserProgressRepository
    {
        private readonly DatabaseService _databaseService;

        public UserProgressRepository(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public async Task<IEnumerable<UserModuleProgress>> GetUserProgressAsync(int userId)
        {
            const string query = "API_GetUserProgress";
            using var connection = _databaseService.CreateConnection();
            return await connection.QueryAsync<UserModuleProgress>(
                query,
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task UpdateUserProgressAsync(int userId, int moduleId, int progress)
        {
            const string query = "API_UpdateUserProgress";
            using var connection = _databaseService.CreateConnection();
            await connection.ExecuteAsync(
                query,
                new { UserId = userId, ModuleId = moduleId, Progress = progress },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<int> GetCompletedModuleCount(int userId)
        {
            const string sql = @"SELECT COUNT(*) FROM UserModuleProgress WHERE UserId = @UserId AND Progress = 100";
            using var conn = _databaseService.CreateConnection();
            return await conn.ExecuteScalarAsync<int>(sql, new { UserId = userId });
        }

    }
}
