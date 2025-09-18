namespace backend.Interfaces;

public interface IAchievementRepository
{
    Task<List<string>> GetUserAchievementCodesAsync(int userId);
    Task GrantAsync(int userId, string achievementCode);
}

