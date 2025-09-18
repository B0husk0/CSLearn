CREATE PROCEDURE API_GetModuleDetails
    @ModuleId INT
AS
BEGIN
    SELECT 
        m.ModuleId,
        m.ModuleName,
        m.Description,
        ms.StepId,
        ms.CharacterName,
        ms.Position,
        ms.Content,
        ms.StepType,
        ms.InteractionType,
        mq.OptionId,
        mq.OptionText,
        mq.IsCorrect
    FROM Modules m
    LEFT JOIN ModuleSteps ms ON m.ModuleId = ms.ModuleId
    LEFT JOIN ModuleQuizOptions mq ON ms.StepId = mq.StepId
    WHERE m.ModuleId = @ModuleId
    ORDER BY ms.StepId;
END;