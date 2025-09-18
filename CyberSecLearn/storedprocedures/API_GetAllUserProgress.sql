CREATE PROCEDURE API_GetAllUserProgress
AS
BEGIN
    SELECT 
        u.UserId,
        u.FirstName + ' ' + u.LastName AS FullName,
        u.Email,
        o.OrganizationName,

        -- ✅ Počet dokončených modulov (iba Progress = 100)
        ISNULL(CompletedModules.CompletedCount, 0) AS ModulesCompleted,

        -- ✅ Celkový počet modulov
        (SELECT COUNT(*) FROM Modules) AS TotalModules,

        -- ✅ Priemerné skóre z quizov
        ISNULL(quizData.QuizAverage, 0) AS QuizAverage,

        -- ✅ Počet dosiahnutých achievementov
        (SELECT COUNT(*) FROM UserAchievements WHERE UserId = u.UserId) AS AchievementsCount,

        ISNULL(uo.RoleTypeId, 0) AS RoleTypeId

    FROM Users u
    LEFT JOIN UserOrganization uo ON u.UserId = uo.UserId
    LEFT JOIN Organization o ON o.OrganizationId = uo.OrganizationId

    -- ✅ Dokončené moduly s Progress = 100
    OUTER APPLY (
        SELECT COUNT(*) AS CompletedCount
        FROM UserModuleProgress ump
        WHERE ump.UserId = u.UserId AND ump.Progress = 100
    ) CompletedModules

    -- ✅ Priemerné skóre z quizov
    OUTER APPLY (
        SELECT AVG(BestScore) AS QuizAverage
        FROM UserQuizScores WHERE UserId = u.UserId
    ) quizData
END