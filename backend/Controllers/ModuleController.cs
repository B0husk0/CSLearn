using backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using backend.Interfaces;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModuleController : ControllerBase
    {
        private readonly IModuleRepository _moduleRepository;

        public ModuleController(IModuleRepository moduleRepository)
        {
            _moduleRepository = moduleRepository;
        }

        // Endpoint na získanie detailu modulu
        [HttpGet("{id}")]
        public async Task<IActionResult> GetModuleDetails(int id)
        {
            var moduleDetails = await _moduleRepository.GetModuleDetailsAsync(id);

            if (moduleDetails == null)
            {
                return NotFound(new { Message = $"Module with ID {id} not found." });
            }

            return Ok(moduleDetails);
        }

    }
}
