CREATE PROCEDURE [dbo].[API_GrantAchievement]
    @UserId INT,
    @Code NVARCHAR(50)
AS
BEGIN
    INSERT INTO UserAchievements (UserId, AchievementId)
    SELECT @UserId, a.AchievementId
    FROM Achievements a
    WHERE a.Code = @Code
    AND NOT EXISTS (
        SELECT 1 FROM UserAchievements
        WHERE UserId = @UserId AND AchievementId = a.AchievementId
    );
END