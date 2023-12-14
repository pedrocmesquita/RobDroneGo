using System.Linq;
using System.Threading.Tasks;
using DDDSample1.Domain.PickupAndDeliveryTasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.PickupAndDeliveryTasks
{
    public class PickupAndDeliveryTaskRepository: BaseRepository<PickupAndDeliveryTask, Identifier>, IPickupAndDeliveryTaskRepository
    {
        private readonly DDDSample1DbContext _context;

        public PickupAndDeliveryTaskRepository(DDDSample1DbContext context) : base(context.PickupAndDeliveryTasks)
        {
            _context = context;
        }

        public async Task<PickupAndDeliveryTask> GetByPickupAndDeliveryTaskIdAsync(
            string pickupAndDeliveryTaskIdentifier)
        {
            return await _context.PickupAndDeliveryTasks.Where(x =>
                pickupAndDeliveryTaskIdentifier.Equals(x.PickupAndDeliveryTaskId.PickupAndDeliveryTaskIdentifier) &&
                x.Active).FirstOrDefaultAsync();
        }
    }
}