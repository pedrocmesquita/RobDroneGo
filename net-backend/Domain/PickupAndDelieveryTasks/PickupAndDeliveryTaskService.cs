
using System;
using System.Collections.Generic;

using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Mappers;


namespace DDDSample1.Domain.PickupAndDeliveryTasks
{

    public class PickupAndDeliveryTaskService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPickUpAndDeliveryTaskMongoRepository _mongoRepo;
        
        // Add a parameterless constructor
        public PickupAndDeliveryTaskService()
        {
        }
        public PickupAndDeliveryTaskService(IUnitOfWork unitOfWork, IPickUpAndDeliveryTaskMongoRepository mongoRepo)
        {
            _unitOfWork = unitOfWork;
            _mongoRepo = mongoRepo;
        }   
        public virtual async Task<List<PickupAndDeliveryTaskDto>> GetAllAsync()
        {
            var list = await this._mongoRepo.GetAllAsync();
        
            List<PickupAndDeliveryTaskDto> listDto = list.ConvertAll<PickupAndDeliveryTaskDto>(ord => PickupAndDeliveryTaskMapper.domainToDTO(ord));

            return listDto;
        }
        
        public virtual async Task<PickupAndDeliveryTaskDto> GetByPickupAndDeliveryTaskIdAsync(string pickupAndDeliveryTaskIdentifier)
        {
            var ord = await this._mongoRepo.GetByPickupAndDeliveryTaskIdAsync(pickupAndDeliveryTaskIdentifier);
            
            if(ord == null)
                return null;

            return PickupAndDeliveryTaskMapper.domainToDTO(ord);
        }
        
        public async Task<PickupAndDeliveryTaskDto> AddAsync(CreatingPickupAndDeliveryTaskDto dto)
        {
            var pickupAndDeliveryTask = new PickupAndDeliveryTask(
                dto.ClientEmail,
                new PickupAndDeliveryTaskId(dto.PickupAndDeliveryTaskId),
                dto.ContactNumber, 
                dto.PickupRoom, 
                dto.DeliveryRoom, 
                dto.PickupContact,
                dto.DeliveryContact, 
                dto.ConfirmationCode, 
                dto.Description);
            
            
            
            await this._mongoRepo.AddAsync(pickupAndDeliveryTask);

            await this._unitOfWork.CommitAsync();

            return PickupAndDeliveryTaskMapper.domainToDTO(pickupAndDeliveryTask);
        }
        
        public async Task<PickupAndDeliveryTaskDto> UpdateBoolAsync(UpdatingPickUpAndDeliveryTaskDto dto)
        {   
            // Print the dto to the console
            Console.WriteLine("--------------------");
            Console.WriteLine(dto.PickupAndDeliveryTaskId);
            Console.WriteLine(dto.Active);
            Console.WriteLine("--------------------");
            
            var pickupAndDeliveryTask = await this._mongoRepo.GetByPickupAndDeliveryTaskIdAsync(dto.PickupAndDeliveryTaskId);
            
            if (pickupAndDeliveryTask == null)
            {
                Console.WriteLine("pickupAndDeliveryTask is null");
                return null;
            }
            
            Console.WriteLine("--------------------");
            Console.WriteLine(pickupAndDeliveryTask.Active);
            Console.WriteLine("--------------------");

            

            if (pickupAndDeliveryTask.Active == false)
            {
                Console.WriteLine("dto.Active is false");
                pickupAndDeliveryTask.Active = true;
            }
            else if (pickupAndDeliveryTask.Active)
            {
                Console.WriteLine("dto.Active is true");
                pickupAndDeliveryTask.Active = false;
            }
            
            pickupAndDeliveryTask.UpdatedAt = DateTime.UtcNow;

            await this._mongoRepo.UpdateAsync(pickupAndDeliveryTask);

            await this._unitOfWork.CommitAsync();

            return PickupAndDeliveryTaskMapper.domainToDTO(pickupAndDeliveryTask);
        }
    }
    
}