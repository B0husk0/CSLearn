CREATE TABLE UserQuizScores (
    UserId INT NOT NULL,
    QuizId INT NOT NULL FOREIGN KEY REFERENCES Quizzes(QuizId),
    BestScore INT NOT NULL,
    PRIMARY KEY (UserId, QuizId)
);
