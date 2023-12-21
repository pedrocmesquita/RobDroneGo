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
        
        // POST: api/PickupAndDeliveryTask
        [HttpPost]
        public async Task<ActionResult<PickupAndDeliveryTaskDto>> Create(CreatingPickupAndDeliveryTaskDto dto)
        {
            var list = await _service.GetAllAsync();
            foreach (var pickupAndDeliveryTaskDto in list)
            {
                if (pickupAndDeliveryTaskDto.PickupAndDeliveryTaskId.Equals(dto.PickupAndDeliveryTaskId))
                {
                    return BadRequest(new { Message = "This pickupAndDeliveryTask identifier already exists try another one." });
                }
            }
            try
            {
                var pickupAndDeliveryTask = await _service.AddAsync(dto);
                
                return CreatedAtAction(nameof(GetByPickupAndDeliveryTaskId), new { pickupAndDeliveryTaskIdentifier = pickupAndDeliveryTask.Id }, pickupAndDeliveryTask);            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
        
        // PUT: api/PickupAndDeliveryTask/
        [HttpPut]
        public async Task<ActionResult<PickupAndDeliveryTaskDto>> Update(UpdatingPickUpAndDeliveryTaskDto dto)
        {   
            Console.WriteLine("hello");
            
            try
            {
                var pickupAndDeliveryTask = await _service.UpdateBoolAsync(dto);
                
                if (pickupAndDeliveryTask == null)
                {
                    return new NotFoundResult();
                }
                
                return pickupAndDeliveryTask;
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}