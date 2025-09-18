CREATE PROCEDURE [dbo].[API_GetUserWithOrganizations]
 @UserId INT
AS
BEGIN
    SELECT 
        u.UserId,
        u.Email,
        u.IsAdmin,
        uo.OrganizationId,
        uo.RoleTypeId
    FROM [Users] u
    LEFT JOIN UserOrganization uo ON u.UserId = uo.UserId
    WHERE u.UserId = @UserId;
END