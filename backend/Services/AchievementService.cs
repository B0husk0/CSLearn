using backend.Interfaces;

public class AchievementService : IAchievementService
{
    private readonly IAchievementRepository _repo;
    private readonly IUserProgressRepository _progress;
    private readonly IQuizRepository _quiz;
    private readonly IDapperProcedureCaller _sp;

    public AchievementService(
        IAchievementRepository repo,
        IUserProgressRepository progress,
        IQuizRepository quiz,
        IDapperProcedureCaller sp)
    {
        _repo = repo;
        _progress = progress;
        _quiz = quiz;
        _sp = sp;
    }

    public async Task CheckAndGrantAsync(int userId)
    {
        var existing = await _repo.GetUserAchievementCodesAsync(userId);

        if (!existing.Contains("quick_learner"))
        {
            var count = await _progress.GetCompletedModuleCount(userId);
            if (count >= 1)
                await _repo.GrantAsync(userId, "quick_learner");
        }

        if (!existing.Contains("perfect_score") &&
            await _quiz.HasPerfectScore(userId))
            await _repo.GrantAsync(userId, "perfect_score");

        //if (!existing.Contains("learning_streak") &&
        //    await _sp.ExecuteBoolAsync("API_HasLearningStreak", new { UserId = userId, MinStreakDays = 3 }))
        //    await _repo.GrantAsync(userId, "learning_streak");

        //if (!existing.Contains("module_master") &&
        //    await _sp.ExecuteBoolAsync("API_HasCompletedAllModules", new { UserId = userId }))
        //    await _repo.GrantAsync(userId, "module_master");

        //if (!existing.Contains("improver") &&
        //    await _sp.ExecuteBoolAsync("API_HasImprovedSignificantly", new { UserId = userId, MinImprovement = 0.2 }))
        //    await _repo.GrantAsync(userId, "improver");
    }
}
