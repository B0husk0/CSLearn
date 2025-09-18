namespace backend.Models
{
    public class Feedback
    {
        public int FeedbackId { get; set; }
        public int Rating { get; set; }
        public string Category { get; set; }
        public string Message { get; set; }
        public bool? Recommend { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}
