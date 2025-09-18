CREATE PROCEDURE API_GetUserProgress
    @UserId INT
AS
BEGIN
    SELECT TOP 100 * 
    FROM UserModuleProgress 
    WHERE UserId = @UserId;
END;