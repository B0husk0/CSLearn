CREATE PROCEDURE API_AddUser
    @Email NVARCHAR(255),
    @PasswordHash NVARCHAR(MAX),
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @CreatedAt DATETIME
AS
BEGIN
    INSERT INTO Users (Email, PasswordHash, FirstName, LastName, CreatedAt)
    VALUES (@Email, @PasswordHash, @FirstName, @LastName, @CreatedAt);
END;