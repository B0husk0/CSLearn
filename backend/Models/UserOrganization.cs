using backend.Enums;

namespace backend.Models
{
    public class UserOrganization
    {
        public int OrganizationId { get; set; }
        public RoleType RoleType { get; set; }
    }
}
