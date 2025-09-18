namespace backend.Models;

public class UserProfile
{
    public int UserId { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? ImageUrl { get; set; }
    public bool IsAdmin { get; set; }
    public string OrganizationName { get; set; } = "N/A";
    public int ModulesCompleted { get; set; }
    public int TotalModules { get; set; }
    public double? AverageQuizScore { get; set; }
    public List<Achievement> Achievements { get; set; } = new();
}


