using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SurveillanceTasks;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.SurveillanceTasks
{
    public class SurveillanceTaskRepository: BaseRepository<SurveillanceTask, Identifier>, ISurveillanceTaskRepository
    {
        private readonly DDDSample1DbContext _context;

        public SurveillanceTaskRepository(DDDSample1DbContext context) : base(context.SurveillanceTasks)
        {
            _context = context;
        }

        public async Task<SurveillanceTask> GetBySurveillanceTaskIdAsync(
            string surveillanceTaskIdentifier)
        {
            return await _context.SurveillanceTasks.Where(x =>
                surveillanceTaskIdentifier.Equals(x.SurveillanceTaskId.SurveillanceTaskIdentifier) &&
                x.Active).FirstOrDefaultAsync();
        }

        public Task<SurveillanceTask> GetByIdAsync(SurveillanceTaskId id)
        {
            throw new System.NotImplementedException();
        }

        public Task<List<SurveillanceTask>> GetByIdsAsync(List<SurveillanceTaskId> ids)
        {
            throw new System.NotImplementedException();
        }
    }
}