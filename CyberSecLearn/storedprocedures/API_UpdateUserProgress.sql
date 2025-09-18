CREATE PROCEDURE API_UpdateUserProgress
    @UserId INT,
    @ModuleId INT,
    @Progress INT
AS
BEGIN
    MERGE UserModuleProgress AS target
    USING (SELECT @UserId AS UserId, @ModuleId AS ModuleId) AS source
    ON target.UserId = source.UserId AND target.ModuleId = source.ModuleId
    WHEN MATCHED THEN 
        UPDATE SET Progress = @Progress
    WHEN NOT MATCHED THEN 
        INSERT (UserId, ModuleId, Progress) VALUES (@UserId, @ModuleId, @Progress);
END;