using System;

namespace DDDSample1.Domain.PickupAndDeliveryTasks
{
    public class PickupAndDeliveryTaskDto
    {   
        public string ClientEmail { get; set; }
        public Guid Id { get; set; }
        public string PickupAndDeliveryTaskId { get; set; }
        public string ContactNumber { get; set; }
        public string PickupRoom { get; set; }
        public string DeliveryRoom { get; set; }
        public string PickupContact { get; set; }
        public string DeliveryContact { get; set; }
        public string ConfirmationCode { get; set; }
        public string Description { get; set; }
        
        public bool Active { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }
    }
}