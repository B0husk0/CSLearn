namespace backend.Models;
public class ModuleDetailDto
{
    public int ModuleId { get; set; }
    public required string ModuleName { get; set; }
    public required string Description { get; set; }

    public List<ModuleStepDto> Steps { get; set; } = new List<ModuleStepDto>();
}
