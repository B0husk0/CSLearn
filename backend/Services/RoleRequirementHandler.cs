using backend.Enums;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace backend.Services;

public class RoleRequirementHandler : AuthorizationHandler<RoleRequirement>
{
    private readonly IUserContext _userContext;
    private readonly IUserRepository _userRepository;

    public RoleRequirementHandler(IUserContext userContext, IUserRepository userRepository)
    {
        _userContext = userContext;
        _userRepository = userRepository;
    }

    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, RoleRequirement requirement)
    {
        var userId = _userContext.UserId;

        var user = await _userRepository.GetUserWithOrganizationsAsync(userId);
        if (user == null)
            return;

        if (user.IsAdmin == true && requirement.PolicyName == RolePolicy.Admin)
        {
            context.Succeed(requirement);
            return;
        }

        // Skontroluj najvyššiu rolu používateľa v rámci organizácie
        var roles = user.UserOrganizations.Select(uo => uo.RoleType).ToList();

        var requiredRole = requirement.PolicyName switch
        {
            RolePolicy.Admin => RoleType.Admin,
            RolePolicy.Manager => RoleType.Manager,
            RolePolicy.BasicUser => RoleType.BasicUser,
            _ => throw new Exception("Unknown policy")
        };

        // Admin > Manager > BasicUser
        bool hasRole = roles.Any(r => r <= requiredRole);
        if (hasRole)
        {
            context.Succeed(requirement);
        }
    }
}
