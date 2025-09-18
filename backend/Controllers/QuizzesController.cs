using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class QuizzesController : ControllerBase
    {
        private readonly IQuizRepository _quizRepository;

        public QuizzesController(IQuizRepository quizRepository)
        {
            _quizRepository = quizRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetQuizzes()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var quizzes = await _quizRepository.GetQuizzesAsync(userId);
            return Ok(quizzes);
        }

        [HttpGet("{quizId}")]
        public async Task<IActionResult> GetQuizDetails(int quizId)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var quiz = await _quizRepository.GetQuizDetailsAsync(quizId, userId);
            return quiz != null ? Ok(quiz) : NotFound();
        }

        [HttpPost("{quizId}/score")]
        public async Task<IActionResult> SubmitScore(int quizId, [FromBody] int score)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            // Retrieve the current best score
            var currentBestScore = await _quizRepository.GetUserBestScoreAsync(userId, quizId);

            // Only update if the new score is greater
            if (score > currentBestScore)
            {
                await _quizRepository.UpdateUserScoreAsync(userId, quizId, score);
            }

            return Ok(new { success = true, updatedScore = Math.Max(score, currentBestScore) });
        }

    }

}
