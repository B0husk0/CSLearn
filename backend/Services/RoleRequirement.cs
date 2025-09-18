using Microsoft.AspNetCore.Authorization;

namespace backend.Services;

public class RoleRequirement : IAuthorizationRequirement
{
    public string PolicyName { get; }

    public RoleRequirement(string policyName)
    {
        PolicyName = policyName;
    }
}
