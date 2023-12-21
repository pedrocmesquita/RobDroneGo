using DDDSample1.Domain.PickupAndDeliveryTasks;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

public class MongoDBContext
{
    private readonly IMongoDatabase _database = null;

    public MongoDBContext(string connectionString, string databaseName)
    {
        var client = new MongoClient(connectionString);
        if (client != null)
            _database = client.GetDatabase(databaseName);
    }
    

    public IMongoCollection<SurveillanceTask> SurveillanceTasks
    {
        get
        {
            return _database.GetCollection<SurveillanceTask>("SurveillanceTask");
        }
        set
        {
            _database.GetCollection<SurveillanceTask>("SurveillanceTask");
        }
    }
    
    public IMongoCollection<PickupAndDeliveryTask> PickUpAndDeliveryTasks
    {
        get
        {
            return _database.GetCollection<PickupAndDeliveryTask>("PickUpAndDeliveryTask");
        }
        set
        {
            _database.GetCollection<PickupAndDeliveryTask>("PickUpAndDeliveryTask");
        }
    }

    
    
    
}