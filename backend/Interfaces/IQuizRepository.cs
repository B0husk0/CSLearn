using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IQuizRepository
    {
        Task<IEnumerable<Quiz>> GetQuizzesAsync(int userId);
        Task<Quiz?> GetQuizDetailsAsync(int quizId, int userId);
        Task UpdateUserScoreAsync(int userId, int quizId, int score);
        Task<int> GetUserBestScoreAsync(int userId, int quizId);
        Task<bool> HasPerfectScore(int userId);

    }

}
