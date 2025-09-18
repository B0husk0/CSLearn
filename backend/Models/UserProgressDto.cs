using backend.Enums;

namespace backend.Models;

public class UserProgressDto
{
    public int UserId { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string OrganizationName { get; set; }
    public int ModulesCompleted { get; set; }
    public int TotalModules { get; set; }
    public int QuizAverage { get; set; }
    public int AchievementsCount { get; set; }
    public RoleType Role { get; set; }
}
