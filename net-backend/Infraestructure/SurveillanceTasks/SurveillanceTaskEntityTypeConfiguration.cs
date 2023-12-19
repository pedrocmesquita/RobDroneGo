using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DDDSample1.Infrastructure.SurveillanceTasks
{
    public class SurveillanceTaskEntityTypeConfiguration: IEntityTypeConfiguration<SurveillanceTask>
    {
        public void Configure(EntityTypeBuilder<SurveillanceTask> builder)
        {
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.SurveillanceTaskId);
            builder.Property(b => b.Floors);

        }
    }
}