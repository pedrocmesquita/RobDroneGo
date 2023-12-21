using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MongoDBContext _context;

        public UnitOfWork(MongoDBContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            // MongoDB doesn't have a built-in transaction system like SQL databases do
            // So you don't need to do anything here to "commit" changes
            // Any changes you make are instantly live

            // This method should return a Task<int> because of the interface,
            // but the int return value doesn't make sense in a MongoDB context.
            // You might want to change your IUnitOfWork interface to reflect this.
            return await Task.FromResult(0);
        }
    }
}