using System.Threading.Tasks;

namespace DDDSample1.Domain.SurveillanceTasks
{
    public interface ISurveillanceTaskMongoRepository
    {
        Task AddAsync(SurveillanceTask surveillanceTask);
    }
}