import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import IElevatorService from './IServices/IElevatorService';
import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import IElevatorDTO from '../dto/IElevatorDTO';
import { ElevatorMap } from "../mappers/ElevatorMap";
import { Elevator } from '../domain/Elevator/elevator';
import IBuildingRepo from "./IRepos/IBuildingRepo";

@Service()
export default class ElevatorService implements IElevatorService {
    constructor(
      @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo,
      @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
    ) {}
    public async getElevator(elevatorId: string): Promise<Result<IElevatorDTO>> {
        try {
            const elevator = await this.elevatorRepo.findByElevatorId(elevatorId);

            if (elevator === null) {
                return Result.fail<IElevatorDTO>("Elevator not found");
            }
            else {
                const elevatorDTOResult = ElevatorMap.toDTO( elevator ) as IElevatorDTO;
                return Result.ok<IElevatorDTO>( elevatorDTOResult )
            }
        } catch (e) {
            throw e;
        }
    }

    public async createElevator(elevatorId: string, buildingId: string, elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {
            const elevator = await this.elevatorRepo.findByElevatorId(elevatorDTO.elevatorId);

            // Check if elevator already exists
            if (elevator != null) {
                return Result.fail<IElevatorDTO>('Elevator already exists: ' + elevatorDTO.elevatorId);
            }

            const building = await this.buildingRepo.findByBuildingId(elevatorDTO.buildingId);

            if (building === null) {
                return Result.fail<IElevatorDTO>("Building not found");
            }

            console.log(elevatorDTO.elevatorId);
            console.log(elevatorDTO.buildingId);
            console.log(elevatorDTO.elevatorBrand);
            console.log(elevatorDTO.elevatorModel);
            console.log(elevatorDTO.elevatorSerNum);
            console.log(elevatorDTO.elevatorDesc);
            console.log(elevatorDTO.currentFloor);
            console.log(elevatorDTO.locationX);
            console.log(elevatorDTO.locationY);


            console.log("\nElevator DTO \n");
            console.log(elevatorDTO);
            console.log("\nBefore creating \n");
            console.log(elevator);
            // Create elevator entity
            const elevatorOrError = await Elevator.create(elevatorDTO);

            console.log("\nAfter creating \n");

            // Check if elevator entity was created successfully
            if (elevatorOrError.isFailure) {
                return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
            }

            // Save elevator entity
            const elevatorResult = elevatorOrError.getValue();

            console.log("\nElevator Result \n");
            console.log(elevatorResult.elevatorId.elevatorId);
            await this.elevatorRepo.save(elevatorResult);

            building.addElevator(elevatorResult);

            await this.buildingRepo.update(building);

            // Return elevator entity
            const elevatorDTOResult = ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
            return Result.ok<IElevatorDTO>(elevatorDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {
            const exists = await this.elevatorRepo.findByElevatorId(elevatorDTO.elevatorId);

            if (exists === null) {
                return Result.fail<IElevatorDTO>("Elevator not found");
            }

            const updatedElevator = await this.elevatorRepo.update(ElevatorMap.toDomain(elevatorDTO));
            const elevatorDTOResult = ElevatorMap.toDTO(updatedElevator) as IElevatorDTO;
            return Result.ok<IElevatorDTO>(elevatorDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async getElevators(): Promise<Result<IElevatorDTO[]>> {
        try {
            const elevators = await this.elevatorRepo.getElevators();

            const elevatorDTOResult = elevators.map( elevator => ElevatorMap.toDTO( elevator ) as IElevatorDTO );

            return Result.ok<IElevatorDTO[]>( elevatorDTOResult );
        } catch (e) {
            throw e;
        }
    }

    public async deleteElevator(elevatorId: string): Promise<Result<boolean>> {
        try {
            const exists = await this.elevatorRepo.findByElevatorId(elevatorId);

            if (exists === null) {
                return Result.fail<boolean>("Elevator not found");
            }

            await this.elevatorRepo.delete(elevatorId);

            return Result.ok<boolean>(true);
        } catch (e) {
            throw e;
        }
    }
}