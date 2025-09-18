CREATE TABLE [dbo].[UserOrganization]
(
	UserOrganizationId INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,
    OrganizationId INT NOT NULL,
    RoleTypeId INT NOT NULL,
    UserStateId INT DEFAULT 1, -- napr. 1 = Active, 2 = Invited, 3 = Blocked

    CONSTRAINT FK_UserOrganization_User FOREIGN KEY (UserId)
        REFERENCES [dbo].[Users](UserId) ON DELETE CASCADE,

    CONSTRAINT FK_UserOrganization_Organization FOREIGN KEY (OrganizationId)
        REFERENCES Organization(OrganizationId) ON DELETE CASCADE,

    CONSTRAINT FK_UserOrganization_RoleType FOREIGN KEY (RoleTypeId)
        REFERENCES RoleType(RoleTypeId),

    CONSTRAINT UQ_UserOrganization UNIQUE(UserId, OrganizationId)
)
