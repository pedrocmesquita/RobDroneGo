using System.Threading.Tasks;

namespace DDDSample1.Domain.PickupAndDeliveryTasks
{
    public class PickUpAndDeliveryTaskMongoRepository : IPickUpAndDeliveryTaskMongoRepository
    {
        private readonly MongoDBContext _context = null;

        public PickUpAndDeliveryTaskMongoRepository(MongoDBContext context)
        {
            _context = context;
        }

        public async Task AddAsync(PickupAndDeliveryTask pickUpAndDeliveryTask)
        {
            await _context.PickUpAndDeliveryTasks.InsertOneAsync(pickUpAndDeliveryTask);
        }

        // Implement other necessary methods here
    }
}