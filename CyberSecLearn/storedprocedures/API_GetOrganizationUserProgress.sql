CREATE PROCEDURE API_GetOrganizationUserProgress
    @OrganizationId INT
AS
BEGIN
    SELECT 
        u.UserId,
        u.FirstName + ' ' + u.LastName AS FullName,
        u.Email,
        o.OrganizationName,

        -- ✅ Počet dokončených modulov na 100 %
        ISNULL(CompletedModules.CompletedCount, 0) AS ModulesCompleted,

        -- ✅ Celkový počet modulov
        (SELECT COUNT(*) FROM Modules) AS TotalModules,

        -- ✅ Priemerné skóre z quizov
        ISNULL(quizData.QuizAverage, 0) AS QuizAverage,

        -- ✅ Počet achievementov
        (SELECT COUNT(*) FROM UserAchievements WHERE UserId = u.UserId) AS AchievementsCount,

        uo.RoleTypeId

    FROM Users u
    INNER JOIN UserOrganization uo ON u.UserId = uo.UserId
    INNER JOIN Organization o ON o.OrganizationId = uo.OrganizationId

    -- ✅ OUTER APPLY pre moduly so 100 % progressom
    OUTER APPLY (
        SELECT COUNT(*) AS CompletedCount
        FROM UserModuleProgress ump
        WHERE ump.UserId = u.UserId AND ump.Progress = 100
    ) CompletedModules

    -- ✅ OUTER APPLY pre priemer z quizov
    OUTER APPLY (
        SELECT AVG(BestScore) AS QuizAverage
        FROM UserQuizScores WHERE UserId = u.UserId
    ) quizData

    WHERE o.OrganizationId = @OrganizationId
END
