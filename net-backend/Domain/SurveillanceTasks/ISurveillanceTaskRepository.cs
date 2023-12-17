using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.SurveillanceTasks
{
    public interface ISurveillanceTaskRepository : IRepository<SurveillanceTask, SurveillanceTaskId>
    {
        Task<SurveillanceTask> GetBySurveillanceTaskIdAsync(string surveillanceTaskIdentifier);
        
    }
}