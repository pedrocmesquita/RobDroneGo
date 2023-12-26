using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.SurveillanceTasks
{
    public class SurveillanceTaskDto
    {   
        public string ClientEmail { get; set; }
        public Guid Id { get; set; }
        public string SurveillanceTaskId { get; set; }
        public string ContactNumber { get; set; }
        
        public string Building { get; set; }
        public string Floors { get; set; }
        
        public bool Active { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }
        
        
    }
}