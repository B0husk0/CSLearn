CREATE TABLE [dbo].[Achievements]
(
    AchievementId INT IDENTITY PRIMARY KEY,
    Code NVARCHAR(50) NOT NULL UNIQUE,
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255),
    IconName NVARCHAR(50)
);