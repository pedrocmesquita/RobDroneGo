using System;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.PickupAndDeliveryTasks
{
    public class PickupAndDeliveryTaskId : IValueObject
    {
        public string PickupAndDeliveryTaskIdentifier { get; set; }

        public PickupAndDeliveryTaskId()
        {
            this.PickupAndDeliveryTaskIdentifier = "";
        }

        public PickupAndDeliveryTaskId(string text)
        {
            this.PickupAndDeliveryTaskIdentifier = ValidateWarehouseIdentifier(text);
        }

        private string ValidateWarehouseIdentifier(string pickupAndDeliveryTaskIdentifier)
        {
            if (pickupAndDeliveryTaskIdentifier == null)
            {
                throw new NullReferenceException("The pickupAndDeliveryTaskId can't be null.");
            }
            else
            {
                if (pickupAndDeliveryTaskIdentifier.Length > 5)
                {
                    throw new BusinessRuleValidationException("The pickupAndDeliveryTaskId can't have more than 5 characters.");
                }
            }

            return pickupAndDeliveryTaskIdentifier;
        }

        public override string ToString()
        {
            return PickupAndDeliveryTaskIdentifier;
        }
    }
}