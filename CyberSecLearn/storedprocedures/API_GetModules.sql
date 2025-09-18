CREATE PROCEDURE API_GetModules
AS
BEGIN
    SELECT TOP 100 ModuleId, ModuleName, Description, CreatedAt, UpdatedAt 
    FROM Modules;
END;
