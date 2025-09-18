CREATE PROCEDURE API_GetUserByEmail
    @Email NVARCHAR(255)
AS
BEGIN
    SELECT TOP 1 * 
    FROM Users 
    WHERE Email = @Email;
END;