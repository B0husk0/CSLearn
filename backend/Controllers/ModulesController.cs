using backend.Interfaces;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ModulesController : ControllerBase
    {
        private readonly IUserProgressRepository _userProgressRepository;
        private readonly IModuleRepository _moduleRepository;

        public ModulesController(IUserProgressRepository userProgressRepository, IModuleRepository moduleRepository)
        {
            _userProgressRepository = userProgressRepository;
            _moduleRepository = moduleRepository;
        }

        /// <summary>
        /// Fetches progress for all modules for the authenticated user.
        /// </summary>
        [HttpGet("Progress")]
        public async Task<IActionResult> GetModuleProgress()
        {
            // Extract the UserId from claims
            if (!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }

            // Fetch progress for the user
            var progress = await _userProgressRepository.GetUserProgressAsync(userId);

            return Ok(progress);
        }

        /// <summary>
        /// Updates the progress for a specific module for the authenticated user.
        /// </summary>
        [HttpPatch("Progress/{moduleId}")]
        public async Task<IActionResult> UpdateProgress(int moduleId, [FromBody] int progress)
        {
            // Extract user ID from JWT claims
            if (!int.TryParse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId))
            {
                return Unauthorized(new { Message = "Invalid or missing user ID in token." });
            }

            // Validate progress value
            if (progress < 0 || progress > 100)
            {
                return BadRequest(new { Message = "Progress must be between 0 and 100." });
            }

            // Update the progress
            await _userProgressRepository.UpdateUserProgressAsync(userId, moduleId, progress);

            return Ok(new { Message = "Progress updated successfully." });
        }


        /// <summary>
        /// Fetches all available modules.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetModules()
        {
            var modules = await _moduleRepository.GetModulesAsync();
            return Ok(modules);
        }
    }
}
