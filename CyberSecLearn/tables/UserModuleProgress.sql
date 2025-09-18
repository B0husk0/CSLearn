CREATE TABLE UserModuleProgress (
    UserId INT NOT NULL,
    ModuleId INT NOT NULL,
    Progress INT NOT NULL DEFAULT 0,
    PRIMARY KEY (UserId, ModuleId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (ModuleId) REFERENCES Modules(ModuleId)
);
