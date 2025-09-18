CREATE PROCEDURE [dbo].[API_GetUserAchievementCodes]
@UserId INT
AS
BEGIN
    SELECT a.Code
    FROM UserAchievements ua
    JOIN Achievements a ON a.AchievementId = ua.AchievementId
    WHERE ua.UserId = @UserId;
END