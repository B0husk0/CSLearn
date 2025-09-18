CREATE PROCEDURE [dbo].[API_UpdateUserImageUrl]
@UserId INT,
    @ImageUrl NVARCHAR(1000)
AS
BEGIN
    UPDATE Users
    SET ImageUrl = @ImageUrl
    WHERE UserId = @UserId;
END