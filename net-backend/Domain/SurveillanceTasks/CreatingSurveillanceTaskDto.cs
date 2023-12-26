using System.Collections.Generic;

namespace DDDSample1.Domain.SurveillanceTasks
{
    public class CreatingSurveillanceTaskDto
    {   
        public string ClientEmail { get; set; }
        public string SurveillanceTaskId { get; set; }
        public string ContactNumber { get; set; }
        
        public string Building { get; set; }
        public string Floors { get; set; }
        
        
    }
}