using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackRepository _feedbackRepository;

        public FeedbackController(IFeedbackRepository feedbackRepository)
        {
            _feedbackRepository = feedbackRepository;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitFeedback([FromBody] Feedback feedback)
        {
            if (feedback.Rating < 1 || feedback.Rating > 5)
                return BadRequest(new { Message = "Rating must be between 1 and 5." });

            if (string.IsNullOrWhiteSpace(feedback.Category))
                return BadRequest(new { Message = "Category is required." });

            var feedbackId = await _feedbackRepository.AddFeedbackAsync(feedback);
            return Ok(new { FeedbackId = feedbackId, Message = "Feedback submitted successfully." });
        }
    }
}
