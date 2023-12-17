using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.SurveillanceTasks
{
    public class SurveillanceTaskDto
    {   
        public Guid Id { get; set; }
        public string SurveillanceTaskId { get; set; }
        public string ContactNumber { get; set; }
        
        public string Building { get; set; }
        public List<string> Floors { get; set; }
        
        
        
    }
}