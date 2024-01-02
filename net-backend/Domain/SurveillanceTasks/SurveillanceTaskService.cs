using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Mappers;

namespace DDDSample1.Domain.SurveillanceTasks
{
    public class SurveillanceTaskService
    {
        private readonly IUnitOfWork _unitOfWork;
        
        private readonly ISurveillanceTaskMongoRepository _mongoRepo;
        
        // Add a parameterless constructor
        public SurveillanceTaskService()
        {
        }
        public SurveillanceTaskService(IUnitOfWork unitOfWork, ISurveillanceTaskMongoRepository mongoRepo)
        {
            _unitOfWork = unitOfWork;
            
            _mongoRepo = mongoRepo;
        }
        public virtual async Task<List<SurveillanceTaskDto>> GetAllAsync()
        {
            var list = await this._mongoRepo.GetAllAsync();
        
            List<SurveillanceTaskDto> listDto = list.ConvertAll<SurveillanceTaskDto>(ord => SurveillanceTaskMapper.domainToDTO(ord));

            return listDto;
        }
        
        public virtual async Task<SurveillanceTaskDto> GetBySurveillanceTaskIdAsync(string surveillanceTaskIdentifier)
        {
            var ord = await this._mongoRepo.GetBySurveillanceTaskIdAsync(surveillanceTaskIdentifier);
            
            if(ord == null)
                return null;

            return SurveillanceTaskMapper.domainToDTO(ord);
        }
        
        public async Task<SurveillanceTaskDto> AddAsync(CreatingSurveillanceTaskDto dto)
        {   
            var surveillanceTask = new SurveillanceTask(
                dto.ClientEmail,
                new SurveillanceTaskId(dto.SurveillanceTaskId),
                dto.ContactNumber, 
                dto.Building,
                dto.Floors);
            
            await this._mongoRepo.AddAsync(surveillanceTask);


            await this._unitOfWork.CommitAsync();

            return SurveillanceTaskMapper.domainToDTO(surveillanceTask);
        }
        
        public async Task<SurveillanceTaskDto> UpdateBoolAsync(UpdatingSurveillanceTaskDto dto)
        {
            var surveillanceTask = await this._mongoRepo.GetBySurveillanceTaskIdAsync(dto.SurveillanceTaskId);
            
            if(surveillanceTask == null)
                return null;

            if (surveillanceTask.Active == false)
            {
                surveillanceTask.Active = true;
            }
            else if (surveillanceTask.Active)
            {
                surveillanceTask.Active = false;
            }
            
            surveillanceTask.UpdatedAt = DateTime.UtcNow;
            
            await this._mongoRepo.UpdateAsync(surveillanceTask);

            await this._unitOfWork.CommitAsync();

            return SurveillanceTaskMapper.domainToDTO(surveillanceTask);
        }
    }
}