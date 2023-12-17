using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.PickupAndDeliveryTasks;
using DDDSample1.Infrastructure.PickupAndDeliveryTasks;
using DDDSample1.Infrastructure.SurveillanceTasks;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {

        public DbSet<PickupAndDeliveryTask> PickupAndDeliveryTasks { get; set; }
        
        public DbSet<SurveillanceTask> SurveillanceTasks { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.ApplyConfiguration(new PickupAndDeliveryTaskEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new SurveillanceTaskEntityTypeConfiguration());
        }
    }
}