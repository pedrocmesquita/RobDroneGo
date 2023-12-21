using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.PickupAndDeliveryTasks;
using Microsoft.AspNetCore.Mvc;
using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.SurveillanceTasks;


namespace DDDSample1.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class SurveillanceTaskController : ControllerBase
    {
        private readonly SurveillanceTaskService _service;

        public SurveillanceTaskController(SurveillanceTaskService service)
        {
            _service = service;
        }

        // GET: api/SurveillanceTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SurveillanceTaskDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/SurveillanceTask/ByIdentifier/id
        [HttpGet("ByIdentifier/{surveillanceTaskIdentifier}")]
        public async Task<ActionResult<SurveillanceTaskDto>> GetBySurveillanceTaskId(string surveillanceTaskIdentifier)
        {
            var surveillanceTask = await _service.GetBySurveillanceTaskIdAsync(surveillanceTaskIdentifier);

            if (surveillanceTask == null)
            {
                return new NotFoundResult();
            }

            return surveillanceTask;
        }

        // POST: api/SurveillanceTask
        [HttpPost]
        public async Task<ActionResult<SurveillanceTaskDto>> Create(CreatingSurveillanceTaskDto dto)
        {
            var list = await _service.GetAllAsync();
            foreach (var surveillanceTaskDto in list)
            {
                if (surveillanceTaskDto.SurveillanceTaskId.Equals(dto.SurveillanceTaskId))
                {
                    return BadRequest(new
                        { Message = "This surveillanceTask identifier already exists try another one." });
                }
            }

            try
            {
                var surveillanceTask = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetBySurveillanceTaskId),
                    new { surveillanceTaskIdentifier = surveillanceTask.SurveillanceTaskId }, surveillanceTask);
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.Message });
            }
        }

        // PUT: api/SurveillanceTask/
        [HttpPut]
        public async Task<ActionResult<SurveillanceTaskDto>> Update(UpdatingSurveillanceTaskDto dto)
        {
            try
            {
                var surveillanceTask = await _service.UpdateBoolAsync(dto);

                if (surveillanceTask == null)
                {
                    return new NotFoundResult();
                }

                return surveillanceTask;

            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.Message });
            }

        }
    }
}