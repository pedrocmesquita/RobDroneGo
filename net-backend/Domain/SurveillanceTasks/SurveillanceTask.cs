
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SurveillanceTasks;

public class SurveillanceTask : Entity<Identifier>, IAggregateRoot
{   
    
    public SurveillanceTaskId SurveillanceTaskId{ get; private set; }
    public string ContactNumber { get; set; }

    public string Building { get; set; }
        
    
    public string Floors { get; set; }

    public bool Active{ get;  set; }

    public SurveillanceTask()
    {
        this.Active = false;
    }

    public SurveillanceTask(SurveillanceTaskId surveillanceTaskId, string contactNumber, string building, string floors)
    {   
        this.Id = new Identifier(Guid.NewGuid());
        this.SurveillanceTaskId = surveillanceTaskId;
        this.ContactNumber = contactNumber;
        this.Building = building;
        this.Floors = floors;
        this.Active = true;
    }
}


