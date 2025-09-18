using backend.Interfaces;
using backend.Models;
using backend.Services;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class ModuleRepository : IModuleRepository
    {
        private readonly DatabaseService _databaseService;

        public ModuleRepository(DatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        public async Task<IEnumerable<Models.Module>> GetModulesAsync()
        {
            const string query = "API_GetModules";
            using var connection = _databaseService.CreateConnection();
            return await connection.QueryAsync<Models.Module>(query, commandType: CommandType.StoredProcedure);
        }

        public async Task<ModuleDetailDto?> GetModuleDetailsAsync(int moduleId)
        {
            const string query = "API_GetModuleDetails";

            using var connection = _databaseService.CreateConnection();

            var moduleDictionary = new Dictionary<int, ModuleDetailDto>();
            var stepDictionary = new Dictionary<int, ModuleStepDto>();

            var result = await connection.QueryAsync(
                query,
                new { ModuleId = moduleId },
                commandType: CommandType.StoredProcedure
            );

            foreach (var row in result)
            {
                // Map ModuleDetailDto
                if (!moduleDictionary.TryGetValue((int)row.ModuleId, out var module))
                {
                    module = new ModuleDetailDto
                    {
                        ModuleId = (int)row.ModuleId,
                        ModuleName = (string)row.ModuleName,
                        Description = (string)row.Description,
                        Steps = new List<ModuleStepDto>()
                    };
                    moduleDictionary[module.ModuleId] = module;
                }

                // Map ModuleStepDto
                if (row.StepId != null && !stepDictionary.TryGetValue((int)row.StepId, out var step))
                {
                    step = new ModuleStepDto
                    {
                        StepId = (int)row.StepId,
                        CharacterName = (string)row.CharacterName,
                        Position = (string)row.Position,
                        Content = (string)row.Content,
                        StepType = (string)row.StepType,
                        InteractionType = row.InteractionType as string,
                        QuizOptions = new List<ModuleQuizOptionDto>()
                    };
                    stepDictionary[step.StepId] = step;
                    module.Steps.Add(step);
                }

                // Map ModuleQuizOptionDto
                if (row.OptionId != null)
                {
                    stepDictionary[(int)row.StepId].QuizOptions.Add(new ModuleQuizOptionDto
                    {
                        OptionId = (int)row.OptionId,
                        OptionText = (string)row.OptionText,
                        IsCorrect = (bool)row.IsCorrect
                    });
                }
            }

            return moduleDictionary.Values.FirstOrDefault();
        }
    }
}
