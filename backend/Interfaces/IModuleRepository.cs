using backend.Models;
using System.Reflection;

namespace backend.Interfaces
{
    public interface IModuleRepository
    {
        Task<IEnumerable<Models.Module>> GetModulesAsync();
        //Task<IEnumerable<ModuleDetailDto>> GetModuleDetailsAsync(int moduleId);
        Task<ModuleDetailDto?> GetModuleDetailsAsync(int moduleId);

    }
}
