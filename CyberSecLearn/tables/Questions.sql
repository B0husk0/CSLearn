CREATE TABLE Questions (
    QuestionId INT PRIMARY KEY IDENTITY(1,1),
    QuizId INT FOREIGN KEY REFERENCES Quizzes(QuizId),
    Text NVARCHAR(MAX) NOT NULL,
    CorrectAnswer INT NOT NULL, -- Index of the correct answer
    Explanation NVARCHAR(MAX)
);
