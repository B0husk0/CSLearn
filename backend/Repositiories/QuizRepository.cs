using backend.Interfaces;
using backend.Models;
using backend.Services;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class QuizRepository : IQuizRepository
    {
        private readonly DatabaseService _databaseService;

        public QuizRepository(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public async Task<IEnumerable<Quiz>> GetQuizzesAsync(int userId)
        {
            const string query = "API_GetQuizzes";
            using var connection = _databaseService.CreateConnection();
            var quizzes = (await connection.QueryAsync<Quiz>(query, commandType: CommandType.StoredProcedure)).ToList();

            // Fetch user scores for quizzes
            foreach (var quiz in quizzes)
            {
                quiz.BestScore = await connection.QuerySingleOrDefaultAsync<int?>(
                    "API_GetUserBestScore",
                    new { UserId = userId, QuizId = quiz.QuizId },
                    commandType: CommandType.StoredProcedure
                );
            }

            return quizzes;
        }

        public async Task<Quiz?> GetQuizDetailsAsync(int quizId, int userId)
        {
            const string query = "API_GetQuizDetails";
            using var connection = _databaseService.CreateConnection();

            // Log request
            Console.WriteLine($"Fetching quiz details for QuizId: {quizId}, UserId: {userId}");

            var results = await connection.QueryAsync(query, new { QuizId = quizId, UserId = userId }, commandType: CommandType.StoredProcedure);

            if (!results.Any())
            {
                // If no data is returned, explicitly return null
                Console.WriteLine($"No quiz details found for QuizId: {quizId}, UserId: {userId}");
                return null;
            }

            var quiz = new Quiz
            {
                QuizId = quizId,
                Title = results.First().Title,
                Description = results.First().Description,
                QuestionsCount = results.First().QuestionsCount,
                TimeLimit = results.First().TimeLimit,
                Difficulty = results.First().Difficulty,
                BestScore = results.FirstOrDefault()?.BestScore,
                Questions = new List<Question>()
            };

            var questionsDictionary = new Dictionary<int, Question>();

            foreach (var row in results)
            {
                Console.WriteLine($"Processing question with QuestionId: {row.QuestionId}, Text: {row.QuestionText}");

                // If question already exists, skip adding it again
                if (row.QuestionId != null)
                {
                    // Check if the question is already added
                    if (!questionsDictionary.TryGetValue(row.QuestionId, out Question? question))
                    {
                        // Add new question
                        question = new Question
                        {
                            QuestionId = row.QuestionId,
                            Text = row.QuestionText,
                            CorrectAnswer = row.CorrectAnswer,
                            Explanation = row.Explanation,
                            Options = new List<Option>()
                        };

                        Console.WriteLine($"New question added with QuestionId: {question.QuestionId}, Text: {question.Text}");

                        // Add question to dictionary and quiz
                        questionsDictionary[row.QuestionId] = question;
                        quiz.Questions.Add(question);
                    }

                    if (row.OptionId != null)
                    {
                        // Log option addition
                        Console.WriteLine($"Adding option for QuestionId: {row.QuestionId}, OptionId: {row.OptionId}, Text: {row.OptionText}");

                        // Add the option to the corresponding question
                        question.Options.Add(new Option
                        {
                            OptionId = row.OptionId,
                            QuestionId = row.QuestionId,
                            Text = row.OptionText
                        });
                    }
                }
            }

            Console.WriteLine($"Quiz details fetched successfully for QuizId: {quizId}. Total Questions: {quiz.Questions.Count}");
            return quiz;
        }

        public async Task<int> GetUserBestScoreAsync(int userId, int quizId)
        {
            const string query = "SELECT BestScore FROM UserQuizScores WHERE UserId = @UserId AND QuizId = @QuizId";
            using var connection = _databaseService.CreateConnection();

            var result = await connection.QuerySingleOrDefaultAsync<int?>(query, new { UserId = userId, QuizId = quizId });
            return result ?? 0; // Return 0 if no score exists
        }


        public async Task UpdateUserScoreAsync(int userId, int quizId, int score)
        {
            const string query = "API_UpdateUserScore";
            using var connection = _databaseService.CreateConnection();
            await connection.ExecuteAsync(query, new { UserId = userId, QuizId = quizId, NewScore = score }, commandType: CommandType.StoredProcedure);
        }

        public async Task<bool> HasPerfectScore(int userId)
        {
            const string procedure = "API_HasPerfectScore";
            using var conn = _databaseService.CreateConnection();
            var result = await conn.ExecuteScalarAsync<int>(procedure, new { UserId = userId }, commandType: CommandType.StoredProcedure);
            return result == 1;
        }

    }

}
