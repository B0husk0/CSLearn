using Microsoft.AspNetCore.Authorization;

namespace backend.Authorization
{
    public class RoleAuthorizeAttribute : AuthorizeAttribute
    {
        public RoleAuthorizeAttribute(string policy) : base(policy)
        {
        }
    }
}
