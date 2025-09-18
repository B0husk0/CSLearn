CREATE PROCEDURE API_GetQuizzes
AS
BEGIN
    SELECT TOP 100
        QuizId, 
        Title, 
        Description, 
        QuestionsCount, 
        TimeLimit, 
        Difficulty
    FROM Quizzes;
END;
