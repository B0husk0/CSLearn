CREATE PROCEDURE [dbo].[API_GetQuizDetails]
    @QuizId INT,
    @UserId INT
AS
BEGIN
    SELECT 
        q.QuizId,
        q.Title,
        q.Description,
        q.QuestionsCount,
        q.TimeLimit,
        q.Difficulty,
        us.BestScore,
        qs.QuestionId,
        qs.Text AS QuestionText,
        qs.CorrectAnswer,
        qs.Explanation,
        o.OptionId,
        o.Text AS OptionText
    FROM Quizzes q
    LEFT JOIN Questions qs ON q.QuizId = qs.QuizId
    LEFT JOIN Options o ON qs.QuestionId = o.QuestionId
    LEFT JOIN UserQuizScores us ON q.QuizId = us.QuizId AND us.UserId = @UserId
    WHERE q.QuizId = @QuizId
    ORDER BY qs.QuestionId, o.OptionId;
END;
