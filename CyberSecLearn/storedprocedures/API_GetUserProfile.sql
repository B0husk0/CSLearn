CREATE PROCEDURE [dbo].[API_GetUserProfile]
    @UserId INT
AS
BEGIN
    -- 1️⃣ Základný profil s organizáciou
    SELECT 
        u.UserId,
        u.FirstName,
        u.LastName,
        u.Email,
        u.ImageUrl,
        u.IsAdmin,
        o.OrganizationName
    FROM Users u
    LEFT JOIN UserOrganization uo ON u.UserId = uo.UserId
    LEFT JOIN Organization o ON uo.OrganizationId = o.OrganizationId
    WHERE u.UserId = @UserId;

    -- 2️⃣ Štatistiky
    SELECT
        (SELECT COUNT(*) FROM UserModuleProgress WHERE UserId = @UserId AND Progress = 100) AS ModulesCompleted,
        (SELECT COUNT(*) FROM Modules) AS TotalModules,
        (SELECT AVG(BestScore * 1.0) FROM UserQuizScores WHERE UserId = @UserId) AS AvgScore;

    -- 3️⃣ Achievementy (spojené s popisom a názvom)
    SELECT 
        a.Title,
        a.Description,
        a.IconName,
        ua.AchievedAt
    FROM UserAchievements ua
    JOIN Achievements a ON a.AchievementId = ua.AchievementId
    WHERE ua.UserId = @UserId
    ORDER BY ua.AchievedAt DESC;
END
