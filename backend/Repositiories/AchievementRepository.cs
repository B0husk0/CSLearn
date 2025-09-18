using backend.Interfaces;
using backend.Services;
using Dapper;
using System.Data;
namespace backend.Repositiories;

public class AchievementRepository : IAchievementRepository
{
    private readonly DatabaseService _db;

    public AchievementRepository(DatabaseService db)
    {
        _db = db;
    }

    public async Task<List<string>> GetUserAchievementCodesAsync(int userId)
    {
        using var conn = _db.CreateConnection();
        var result = await conn.QueryAsync<string>(
            "API_GetUserAchievementCodes",
            new { UserId = userId },
            commandType: CommandType.StoredProcedure
        );
        return result.ToList();
    }

    public async Task GrantAsync(int userId, string achievementCode)
    {
        using var conn = _db.CreateConnection();
        await conn.ExecuteAsync(
            "API_GrantAchievement",
            new { UserId = userId, Code = achievementCode },
            commandType: CommandType.StoredProcedure
        );
    }
}
