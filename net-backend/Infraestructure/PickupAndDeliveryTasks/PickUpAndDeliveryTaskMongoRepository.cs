using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.PickupAndDeliveryTasks;
using DDDSample1.Domain.Shared;
using MongoDB.Driver;

public class PickUpAndDeliveryTaskMongoRepository : IPickUpAndDeliveryTaskMongoRepository
{
    private readonly MongoDBContext _context;

    public PickUpAndDeliveryTaskMongoRepository(MongoDBContext context)
    {
        _context = context;
    }

    public async Task<PickupAndDeliveryTask> GetByPickupAndDeliveryTaskIdAsync(string pickupAndDeliveryTaskIdentifier)
    {
        return await _context.PickUpAndDeliveryTasks.Find(x =>
            pickupAndDeliveryTaskIdentifier.Equals(x.PickupAndDeliveryTaskId.PickupAndDeliveryTaskIdentifier)).FirstOrDefaultAsync();
    }

    public async Task<PickupAndDeliveryTask> AddAsync(PickupAndDeliveryTask task)
    {
        await _context.PickUpAndDeliveryTasks.InsertOneAsync(task);
        return task;
    }

    public async Task<List<PickupAndDeliveryTask>> GetAllAsync()
    {
        return await _context.PickUpAndDeliveryTasks.Find(_ => true).ToListAsync();
    }

    public async Task<PickupAndDeliveryTask> GetByIdAsync(Identifier id)
    {
        return await _context.PickUpAndDeliveryTasks.Find(x => id.Equals(x.Id)).FirstOrDefaultAsync();
    }

    public async Task<List<PickupAndDeliveryTask>> GetByIdsAsync(List<Identifier> ids)
    {
        return await _context.PickUpAndDeliveryTasks.Find(x => ids.Contains(x.Id)).ToListAsync();
    }

    public void Remove(PickupAndDeliveryTask task)
    {
        _context.PickUpAndDeliveryTasks.DeleteOne(x => x.Id.Equals(task.Id));
    }
    
    public async Task<PickupAndDeliveryTask> UpdateAsync(PickupAndDeliveryTask task)
    {
        await _context.PickUpAndDeliveryTasks.ReplaceOneAsync(x => x.Id.Equals(task.Id), task);
        return task;
    }
}