namespace backend.Models
{
    public class ModuleStepDto
    {
        public int StepId { get; set; }
        public required string CharacterName { get; set; }
        public required string Position { get; set; } // "left" or "right"
        public required string Content { get; set; }
        public required string StepType { get; set; } // "dialogue" or "quiz"
        public string? InteractionType { get; set; } // "quiz" or "exercise" (nullable for dialogue)

        public List<ModuleQuizOptionDto> QuizOptions { get; set; } = new List<ModuleQuizOptionDto>();
    }

}
