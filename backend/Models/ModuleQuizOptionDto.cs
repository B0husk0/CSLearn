namespace backend.Models
{
    public class ModuleQuizOptionDto
    {
        public int OptionId { get; set; }
        public required string OptionText { get; set; }
        public bool IsCorrect { get; set; }
    }

}
