using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.SurveillanceTasks;
using MongoDB.Driver;

public class SurveillanceTaskMongoRepository : ISurveillanceTaskMongoRepository
{
    private readonly MongoDBContext _context = null;

    public SurveillanceTaskMongoRepository(MongoDBContext context)
    {
        _context = context;
    }

    public async Task<SurveillanceTask> GetBySurveillanceTaskIdAsync(string surveillanceTaskIdentifier)
    {
        return await _context.SurveillanceTasks.Find(x =>
            surveillanceTaskIdentifier.Equals(x.SurveillanceTaskId.SurveillanceTaskIdentifier)).FirstOrDefaultAsync();
    }

    public async Task<SurveillanceTask> AddAsync(SurveillanceTask task)
    {
        await _context.SurveillanceTasks.InsertOneAsync(task);
        return task;
    }

    public async Task<List<SurveillanceTask>> GetAllAsync()
    {
        return await _context.SurveillanceTasks.Find(_ => true).ToListAsync();
    }

    public async Task<SurveillanceTask> GetByIdAsync(SurveillanceTaskId id)
    {
        return await _context.SurveillanceTasks.Find(x => id.Equals(x.SurveillanceTaskId)).FirstOrDefaultAsync();
    }

    public async Task<List<SurveillanceTask>> GetByIdsAsync(List<SurveillanceTaskId> ids)
    {
        return await _context.SurveillanceTasks.Find(x => ids.Contains(x.SurveillanceTaskId)).ToListAsync();
    }

    public void Remove(SurveillanceTask task)
    {
        _context.SurveillanceTasks.DeleteOne(x => x.SurveillanceTaskId.Equals(task.SurveillanceTaskId));
    }
    
    public async Task<SurveillanceTask> UpdateAsync(SurveillanceTask task)
    {
        await _context.SurveillanceTasks.ReplaceOneAsync(x => x.SurveillanceTaskId.Equals(task.SurveillanceTaskId), task);
        return task;
    }
}