namespace backend.Models
{
    public class Organization
    {
        public int OrganizationId { get; set; }
        public string OrganizationName { get; set; }
        public string Domain { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
