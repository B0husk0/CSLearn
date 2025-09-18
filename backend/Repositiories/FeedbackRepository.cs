using backend.Interfaces;
using backend.Models;
using backend.Services;
using Dapper;
using System.Data;
using System.Threading.Tasks;

namespace backend.Repositories
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly DatabaseService _databaseService;

        public FeedbackRepository(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public async Task<int> AddFeedbackAsync(Feedback feedback)
        {
            const string query = "API_AddFeedback";

            using var connection = _databaseService.CreateConnection();
            return await connection.ExecuteScalarAsync<int>(
                query,
                new
                {
                    feedback.Rating,
                    feedback.Category,
                    feedback.Message,
                    feedback.Recommend
                },
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
