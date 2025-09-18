CREATE TABLE Feedback (
    FeedbackId INT IDENTITY PRIMARY KEY,
    Rating INT NOT NULL, -- Values from 1 to 5
    Category NVARCHAR(50) NOT NULL,
    Message NVARCHAR(MAX),
    Recommend BIT NULL, -- Nullable to allow "no answer"
    SubmittedAt DATETIME DEFAULT GETDATE()
);
