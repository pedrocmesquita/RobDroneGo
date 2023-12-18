using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Mappers;

namespace DDDSample1.Domain.SurveillanceTasks
{
    public class SurveillanceTaskService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISurveillanceTaskRepository _repo;
        private readonly ISurveillanceTaskMongoRepository _mongoRepo;
        public SurveillanceTaskService(IUnitOfWork unitOfWork, ISurveillanceTaskRepository repo, ISurveillanceTaskMongoRepository mongoRepo)
        {
            _unitOfWork = unitOfWork;
            _repo = repo;
            _mongoRepo = mongoRepo;
        }
        public async Task<List<SurveillanceTaskDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
        
            List<SurveillanceTaskDto> listDto = list.ConvertAll<SurveillanceTaskDto>(ord => SurveillanceTaskMapper.domainToDTO(ord));

            return listDto;
        }
        
        public async Task<SurveillanceTaskDto> GetBySurveillanceTaskIdAsync(string surveillanceTaskIdentifier)
        {
            var ord = await this._repo.GetBySurveillanceTaskIdAsync(surveillanceTaskIdentifier);
            
            if(ord == null)
                return null;

            return SurveillanceTaskMapper.domainToDTO(ord);
        }
        
        public async Task<SurveillanceTaskDto> AddAsync(CreatingSurveillanceTaskDto dto)
        {   
            var surveillanceTask = new SurveillanceTask(
                new SurveillanceTaskId(dto.SurveillanceTaskId),
                dto.ContactNumber, 
                dto.Building,
                dto.Floors);
            
            await this._repo.AddAsync(surveillanceTask);
            await this._mongoRepo.AddAsync(surveillanceTask);


            await this._unitOfWork.CommitAsync();

            return SurveillanceTaskMapper.domainToDTO(surveillanceTask);
        }
    }
}