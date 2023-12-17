
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
    [NotMapped]
    public List<string> Floors { get; set; }

    public bool Active{ get;  private set; }

    public SurveillanceTask()
    {
        this.Active = true;
    }

    public SurveillanceTask(SurveillanceTaskId surveillanceTaskId, string contactNumber, string building, List<string> floors)
    {   
        this.Id = new Identifier(Guid.NewGuid());
        this.SurveillanceTaskId = surveillanceTaskId;
        this.ContactNumber = contactNumber;
        this.Building = building;
        this.Floors = floors;
        this.Active = true;
    }
}

