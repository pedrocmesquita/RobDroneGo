
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Common;
using DDDSample1.Domain.Shared;

public class SurveillanceTask : Entity<Identifier>, IAggregateRoot
{
    public string ContactNumber { get; set; }

    public string Building { get; set; }
    public List<int> Floors { get; set; }

    public bool Active{ get;  private set; }

    public SurveillanceTask()
    {
        this.Active = true;
    }

    public SurveillanceTask(string contactNumber, string building, List<int> floors)
    {
        this.Id = new Identifier(Guid.NewGuid());
        this.ContactNumber = contactNumber;
        this.Building = building;
        this.Floors = floors;
        this.Active = true;
    }
}


