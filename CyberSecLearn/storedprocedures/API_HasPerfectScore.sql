CREATE PROCEDURE [dbo].[API_HasPerfectScore]
    @UserId INT
AS
BEGIN
    SELECT TOP 1 1 AS Result
    FROM UserQuizScores
    WHERE UserId = @UserId AND BestScore = 100;
END
