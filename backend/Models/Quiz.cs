namespace backend.Models
{
    public class Quiz
    {
        public int QuizId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int QuestionsCount { get; set; }
        public int TimeLimit { get; set; }
        public string Difficulty { get; set; }
        public int? BestScore { get; set; }
        public List<Question> Questions { get; set; } = new();
    }

}
