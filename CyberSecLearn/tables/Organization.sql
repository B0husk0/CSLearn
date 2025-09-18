CREATE TABLE [dbo].[Organization]
(
	OrganizationId INT PRIMARY KEY IDENTITY,
    OrganizationName NVARCHAR(255) NOT NULL,
	Domain NVARCHAR(255),
    CreatedAt DATETIME
)
