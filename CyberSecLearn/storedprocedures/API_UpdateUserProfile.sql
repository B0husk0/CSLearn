CREATE PROCEDURE [dbo].[API_UpdateUserProfile]
@UserId INT,
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @Email NVARCHAR(255)
AS
BEGIN
    UPDATE Users
    SET 
        FirstName = @FirstName,
        LastName = @LastName,
        Email = @Email
    WHERE UserId = @UserId;
END