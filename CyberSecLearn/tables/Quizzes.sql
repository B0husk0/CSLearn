CREATE TABLE Quizzes (
    QuizId INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    QuestionsCount INT NOT NULL,
    TimeLimit INT NOT NULL, -- in seconds
    Difficulty NVARCHAR(50) NOT NULL
);
