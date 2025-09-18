CREATE PROCEDURE [dbo].[API_GetUserById]
 @UserId INT
AS
BEGIN
    SELECT 
        u.UserId,
        u.FirstName,
        u.LastName,
        u.Email,
        u.ImageUrl,
        u.IsAdmin,
        o.OrganizationName
    FROM Users u
    LEFT JOIN UserOrganization uo ON u.UserId = uo.UserId
    LEFT JOIN Organization o ON uo.OrganizationId = o.OrganizationId
    WHERE u.UserId = @UserId;
END