CREATE TABLE [dbo].[UserAchievements]
(
    UserId INT NOT NULL,
    AchievementId INT NOT NULL,
    AchievedAt DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (UserId, AchievementId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (AchievementId) REFERENCES Achievements(AchievementId)
);
