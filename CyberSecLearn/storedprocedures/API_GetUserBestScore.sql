CREATE PROCEDURE API_GetUserBestScore
    @UserId INT,
    @QuizId INT
AS
BEGIN
    SELECT BestScore 
    FROM UserQuizScores
    WHERE UserId = @UserId AND QuizId = @QuizId;
END;
