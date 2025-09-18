using backend.Models;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IFeedbackRepository
    {
        Task<int> AddFeedbackAsync(Feedback feedback);
    }
}
