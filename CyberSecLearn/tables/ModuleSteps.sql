CREATE TABLE ModuleSteps (
    StepId INT PRIMARY KEY IDENTITY(1,1),
    ModuleId INT NOT NULL FOREIGN KEY REFERENCES Modules(ModuleId) ON DELETE CASCADE, -- Ensures cleanup when a module is deleted
    CharacterName NVARCHAR(100) NOT NULL, -- e.g., Riley, Grace
    Position NVARCHAR(10) NOT NULL CHECK (Position IN ('left', 'right')),
    Content NVARCHAR(MAX) NOT NULL, -- Dialogue or question content
    StepType NVARCHAR(20) NOT NULL CHECK (StepType IN ('dialogue', 'quiz')),
    InteractionType NVARCHAR(20) NULL CHECK (InteractionType IN ('quiz', 'exercise')), -- Nullable if dialogue
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL
);