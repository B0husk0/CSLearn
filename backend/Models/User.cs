namespace backend.Models
{
    public class User
    {
        public int UserId { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool? IsAdmin { get; set; }
        public List<UserOrganization> UserOrganizations { get; set; } = new();
        public string? ImageUrl { get; set; }
        public string? OrganizationName { get; set; }
    }
}
