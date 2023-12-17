using DDDSample1.Domain.PickupAndDeliveryTasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.PickupAndDeliveryTasks
{
    internal class PickupAndDeliveryTaskEntityTypeConfiguration : IEntityTypeConfiguration<PickupAndDeliveryTask>
    {

        public void Configure(EntityTypeBuilder<PickupAndDeliveryTask> builder)
        {
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.PickupAndDeliveryTaskId);
        }
    }
}