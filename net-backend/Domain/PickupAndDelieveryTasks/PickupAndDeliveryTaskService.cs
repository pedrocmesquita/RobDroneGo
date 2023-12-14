
using System.Collections.Generic;

using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Mappers;


namespace DDDSample1.Domain.PickupAndDeliveryTasks
{

    public class PickupAndDeliveryTaskService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPickupAndDeliveryTaskRepository _repo;
        
        public async Task<List<PickupAndDeliveryTaskDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
        
            List<PickupAndDeliveryTaskDto> listDto = list.ConvertAll<PickupAndDeliveryTaskDto>(ord => PickupAndDeliveryTaskMapper.domainToDTO(ord));

            return listDto;
        }
        
        public async Task<PickupAndDeliveryTaskDto> GetByPickupAndDeliveryTaskIdAsync(string pickupAndDeliveryTaskIdentifier)
        {
            var ord = await this._repo.GetByPickupAndDeliveryTaskIdAsync(pickupAndDeliveryTaskIdentifier);
            
            if(ord == null)
                return null;

            return PickupAndDeliveryTaskMapper.domainToDTO(ord);
        }
    }
    
}