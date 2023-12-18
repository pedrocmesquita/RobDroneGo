using System.Threading.Tasks;
using DDDSample1.Domain.SurveillanceTasks;

public class SurveillanceTaskMongoRepository : ISurveillanceTaskMongoRepository
{
    private readonly MongoDBContext _context = null;

    public SurveillanceTaskMongoRepository(MongoDBContext context)
    {
        _context = context;
    }

    public async Task AddAsync(SurveillanceTask surveillanceTask)
    {
        await _context.SurveillanceTasks.InsertOneAsync(surveillanceTask);
    }

    // Implement other necessary methods here
}