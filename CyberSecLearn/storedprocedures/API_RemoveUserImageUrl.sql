CREATE PROCEDURE [dbo].[API_RemoveUserImageUrl]
@UserId INT
AS
BEGIN
    UPDATE Users
    SET ImageUrl = NULL
    WHERE UserId = @UserId;
END