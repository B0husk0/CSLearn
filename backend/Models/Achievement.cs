namespace backend.Models;

public class Achievement
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime AchievedAt { get; set; }
}
