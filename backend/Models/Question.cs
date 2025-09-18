namespace backend.Models
{
    public class Question
    {
        public int QuestionId { get; set; }
        public string Text { get; set; }
        public int CorrectAnswer { get; set; }
        public string Explanation { get; set; }
        public List<Option> Options { get; set; } = new();
    }

}
