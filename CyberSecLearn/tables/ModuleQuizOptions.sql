CREATE TABLE ModuleQuizOptions (
    OptionId INT PRIMARY KEY IDENTITY(1,1),
    StepId INT NOT NULL FOREIGN KEY REFERENCES ModuleSteps(StepId) ON DELETE CASCADE, -- Ensures cleanup when a step is deleted
    OptionText NVARCHAR(MAX) NOT NULL,
    IsCorrect BIT NOT NULL DEFAULT 0
);