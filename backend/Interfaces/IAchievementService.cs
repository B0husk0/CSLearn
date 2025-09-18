namespace backend.Interfaces;

public interface IAchievementService
{
    Task CheckAndGrantAsync(int userId);
}
