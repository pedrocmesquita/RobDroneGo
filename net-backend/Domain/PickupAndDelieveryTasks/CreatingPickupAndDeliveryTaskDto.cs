namespace DDDSample1.Domain.PickupAndDeliveryTasks
{
    public class CreatingPickupAndDeliveryTaskDto
    {   
        public string ClientEmail { get; set; }
        public string PickupAndDeliveryTaskId { get; set; }
        public string ContactNumber { get; set; }
        public string PickupRoom { get; set; }
        public string DeliveryRoom { get; set; }
        public string PickupContact { get; set; }
        public string DeliveryContact { get; set; }
        public string ConfirmationCode { get; set; }
        public string Description { get; set; }
    }
}