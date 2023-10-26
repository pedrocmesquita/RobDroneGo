import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import IElevatorService from './IServices/IElevatorService';
import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import IElevatorDTO from '../dto/iElevatorDTO';
import { ElevatorMap } from "../mappers/ElevatorMap";
import { Elevator } from '../domain/Building/elevator';

@Service()
export default class ElevatorService implements IElevatorService {
    constructor(
        @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo
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

    public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {
            const elevatorOrError = await Elevator.create( elevatorDTO );

            if (elevatorOrError.isFailure) {
                return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
            }

            const elevatorResult = elevatorOrError.getValue();
            
            console.log("1 - ", elevatorResult);

            await this.elevatorRepo.save(elevatorResult);

            const elevatorDTOResult = ElevatorMap.toDTO( elevatorResult ) as IElevatorDTO;
            return Result.ok<IElevatorDTO>( elevatorDTOResult )
        } catch (e) {
            throw e;
        }
    }

    public async updateElevator(elevatorId: string, elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {
            const elevator = await this.elevatorRepo.findByElevatorId(elevatorId);

            if (elevator === null) {
                return Result.fail<IElevatorDTO>("Elevator not found");
            }
            else {
                const elevatorOrError = await Elevator.create( elevatorDTO );

                if (elevatorOrError.isFailure) {
                    return Result.fail<IElevatorDTO>(elevatorOrError.errorValue());
                }

                const elevatorResult = elevatorOrError.getValue();

                elevatorResult.elevatorId = elevator.elevatorId;

                await this.elevatorRepo.update(elevatorResult);

                const elevatorDTOResult = ElevatorMap.toDTO( elevatorResult ) as IElevatorDTO;
                return Result.ok<IElevatorDTO>( elevatorDTOResult )
            }
        } catch (e) {
            throw e;
        }
    }

    public async deleteElevator(elevatorId: string): Promise<Result<boolean>> {
        try {
            const elevator = await this.elevatorRepo.findByElevatorId(elevatorId);

            if (elevator === null) {
                return Result.fail<boolean>("Elevator not found");
            }
            else {
                await this.elevatorRepo.delete(elevator);

                return Result.ok<boolean>( true )
            }
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

    public async getElevatorsByBuildingId(buildingId: string): Promise<Result<IElevatorDTO[]>> {
        try {
            const elevators = await this.elevatorRepo.getElevatorsByBuildingId(buildingId);

            const elevatorDTOResult = elevators.map( elevator => ElevatorMap.toDTO( elevator ) as IElevatorDTO );

            return Result.ok<IElevatorDTO[]>( elevatorDTOResult );
        } catch (e) {
            throw e;
        }
    }

}