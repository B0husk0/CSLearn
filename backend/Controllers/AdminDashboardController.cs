
using backend.Enums;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/dashboard")]
public class AdminDashboardController : ControllerBase
{
    private readonly IDashboardRepository _dashboardRepository;

    public AdminDashboardController(IDashboardRepository dashboardRepository)
    {
        _dashboardRepository = dashboardRepository;
    }

    // GET api/dashboard/admin
    [HttpGet("admin")]
    [Authorize(Roles = nameof(RoleType.Admin))]
    public async Task<ActionResult<IEnumerable<UserProgressDto>>> GetAllUserProgress()
    {
        var result = await _dashboardRepository.GetAllUserProgressAsync();
        return Ok(result);
    }

    // GET api/dashboard/organization
    [HttpGet("organization")]
    [Authorize(Roles = $"{nameof(RoleType.Manager)},{nameof(RoleType.Admin)}")]
    public async Task<ActionResult<IEnumerable<UserProgressDto>>> GetOrganizationUserProgress()
    {
        var userId = int.Parse(User.FindFirst("UserId")?.Value ?? "0");


        var organizationId = await _dashboardRepository.GetOrganizationIdForUserAsync(userId);

        var result = await _dashboardRepository.GetOrganizationUserProgressAsync(organizationId);
        return Ok(result);
    }

}
