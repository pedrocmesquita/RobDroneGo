using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.PickupAndDeliveryTasks;
using Microsoft.AspNetCore.Mvc;
using System;
using DDDSample1.Domain.Shared;


namespace DDDSample1.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    
    public class PickupAndDeliveryTaskController: ControllerBase
    {
        private readonly PickupAndDeliveryTaskService _service;
        
        public PickupAndDeliveryTaskController(PickupAndDeliveryTaskService service)
        {
            _service = service;
        }
        
        // GET: api/PickupAndDeliveryTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PickupAndDeliveryTaskDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }
        
        // GET: api/PickupAndDeliveryTask/ByIdentifier/id
        [HttpGet("ByIdentifier/{pickupAndDeliveryTaskIdentifier}")]
        public async Task<ActionResult<PickupAndDeliveryTaskDto>> GetByPickupAndDeliveryTaskId(string pickupAndDeliveryTaskIdentifier)
        {
            var pickupAndDeliveryTask = await _service.GetByPickupAndDeliveryTaskIdAsync(pickupAndDeliveryTaskIdentifier);
            
            if (pickupAndDeliveryTask == null)
            {
                return new NotFoundResult();
            }
            
            return pickupAndDeliveryTask;
        }
    }
}