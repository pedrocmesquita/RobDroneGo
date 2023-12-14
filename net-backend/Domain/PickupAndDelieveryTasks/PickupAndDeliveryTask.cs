using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.PickupAndDeliveryTasks
{
    

public class PickupAndDeliveryTask : Entity<Identifier>, IAggregateRoot
{
    
    public PickupAndDeliveryTaskId PickupAndDeliveryTaskId{ get; private set; }
    public string ContactNumber { get; set; }

    public string PickupRoom { get; set; }
    public string DeliveryRoom { get; set; }
    public string PickupContact { get; set; }
    public string DeliveryContact { get; set; }
    public string ConfirmationCode { get; set; }
    public string Description { get; set; }

    public bool Active{ get;  private set; }

    public PickupAndDeliveryTask()
    {
        this.Active = true;
    }

    public PickupAndDeliveryTask(string contactNumber, string pickupRoom, string deliveryRoom, string pickupContact, string deliveryContact, string confirmationCode, string description)
    {
        this.Id = new Identifier(Guid.NewGuid());
        this.ContactNumber = contactNumber;
        this.PickupRoom = pickupRoom;
        this.DeliveryRoom = deliveryRoom;
        this.PickupContact = pickupContact;
        this.DeliveryContact = deliveryContact;
        this.ConfirmationCode = confirmationCode;
        this.Description = description;
        this.Active = true;
    }
}

}
