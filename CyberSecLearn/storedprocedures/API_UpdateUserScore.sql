CREATE PROCEDURE API_UpdateUserScore
    @UserId INT,
    @QuizId INT,
    @NewScore INT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM UserQuizScores WHERE UserId = @UserId AND QuizId = @QuizId)
    BEGIN
        UPDATE UserQuizScores
        SET BestScore = CASE WHEN @NewScore > BestScore THEN @NewScore ELSE BestScore END
        WHERE UserId = @UserId AND QuizId = @QuizId;
    END
    ELSE
    BEGIN
        INSERT INTO UserQuizScores (UserId, QuizId, BestScore)
        VALUES (@UserId, @QuizId, @NewScore);
    END;
END;
