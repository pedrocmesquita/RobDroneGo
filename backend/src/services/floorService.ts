import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import IFloorService from './IServices/IFloorService';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import IFloorDTO from '../dto/IFloorDTO';
import { FloorMap } from "../mappers/FloorMap";
import { Floor } from '../domain/Floor/floor';
import { Building } from '../domain/Building/building';
import { BuildingId } from '../domain/Building/buildingId';
import IBuildingRepo from "./IRepos/IBuildingRepo";
import IConnectionDTO from "../dto/IConnectionDTO";
import { ConnectionMap } from "../mappers/ConnectionMap";
import IRoomDTO from "../dto/IRoomDTO";
import { RoomMap } from "../mappers/RoomMap";
import { monitorEventLoopDelay } from "perf_hooks";
import IConnectionRepo from "./IRepos/IConnectionRepo";
import IRoomRepo from "./IRepos/IRoomRepo";
import IElevatorRepo from "./IRepos/IElevatorRepo";
import { ElevatorMap } from "../mappers/ElevatorMap";
import IElevatorDTO from "../dto/IElevatorDTO";

@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo,
        @Inject(config.repos.connection.name) private connectionRepo : IConnectionRepo,
        @Inject(config.repos.room.name) private roomRepo : IRoomRepo,
        @Inject(config.repos.elevator.name) private elevatorRepo : IElevatorRepo
    ) {}

    public async getFloor(floorId: string): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByFloorId(floorId);

            if (floor === null) {
                return Result.fail<IFloorDTO>("Floor not found");
            }
            else {
                const floorDTOResult = FloorMap.toDTO( floor ) as IFloorDTO;
                return Result.ok<IFloorDTO>( floorDTOResult )
            }
        } catch (e) {
            throw e;
        }
    }

    public async createFloor(floorId: string, buildingId: string, floorDTO:IFloorDTO): Promise<Result<IFloorDTO>> {
        try {

            const building = await this.buildingRepo.findByBuildingId(floorDTO.buildingId);

            if (building === null) {
                return Result.fail<IFloorDTO>("Building not found");
            }

            // Get building size




            floorDTO.connections = [];
            floorDTO.rooms = [];
            floorDTO.elevators = [];

            const floor = await this.floorRepo.findByFloorId(floorDTO.floorId);

            // Check if floor already exists
            if (floor != null) {
                return Result.fail<IFloorDTO>('Floor already exists: ' + floorDTO.floorId);
            }

            // Check if the max number of floors has been reached
            if (building.floors.length >= building.buildingNumberOfFloors.buildingNumberOfFloors) {
                return Result.fail<IFloorDTO>("Max number of floors reached for this building");
            }

            const width = building.dimX;
            const height = building.dimY;

            console.log(width);
            console.log(height);

            floorDTO.width = width;
            floorDTO.height = height;

            // Create floor entity
            const floorOrError = await Floor.create(floorDTO);

            // Check if floor entity was created successfully
            if (floorOrError.isFailure) {
                return Result.fail<IFloorDTO>(floorOrError.errorValue());
            }

            // Save floor entity
            const newFloor = floorOrError.getValue();

            await this.floorRepo.save(newFloor);

            building.addFloor(newFloor);

            await this.buildingRepo.update(building);

            // Return floor entity
            const floorDTOResult = FloorMap.toDTO(newFloor) as IFloorDTO;

            return Result.ok<IFloorDTO>(floorDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async updateFloor(floorDTO: IFloorDTO, oldFloorId: string): Promise<Result<IFloorDTO>> {
        try {

            // Check if floor exists
            const oldFloor = await this.floorRepo.findByFloorId(oldFloorId);

            if (oldFloor === null) {
                return Result.fail<IFloorDTO>("Floor not found");
            }

            // Check if the new floorId is already taken
            const newFloor = await this.floorRepo.findByFloorId(floorDTO.floorId);

            if (newFloor != null) {
                return Result.fail<IFloorDTO>("FloorId already taken");
            }

            const building = await this.buildingRepo.findByBuildingId(floorDTO.buildingId);

            if (building === null) {
                return Result.fail<IFloorDTO>("Building not found");
            }

            if (floorDTO.floorNumber !== oldFloor.floorNumber.floorNumber) {

                const oldConnections = oldFloor.connections.map(connection => ConnectionMap.toDTO(connection) as IConnectionDTO);
                const oldRooms = oldFloor.rooms.map(room => RoomMap.toDTO(room) as IRoomDTO);
                const oldElevators = oldFloor.elevators.map(elevator => elevator.elevatorId.elevatorId);
                floorDTO.connections = [];
                floorDTO.rooms = [];
                floorDTO.elevators = [];

                // Remove connections from the other floor
                for (const connection of oldConnections) {
                    await this.connectionRepo.deleteAllInstancesOfConnection(connection.connectionId);
                    await this.floorRepo.deleteAllConnectionsFromFloor(connection.connectionId);
                }
                for (const room of oldRooms) {
                    this.roomRepo.deleteAllRoomsFromFloor(room.floorId);
                  }
                for (const elevator of oldElevators) {
                    this.elevatorRepo.deleteAllElevatorsFromFloor(elevator);
                  }

                // Remove connection from the other floor


            } else
            {
                floorDTO.connections = oldFloor.connections.map(connection => ConnectionMap.toDTO(connection) as IConnectionDTO);
                floorDTO.rooms = oldFloor.rooms.map(room => RoomMap.toDTO(room) as IRoomDTO);
                floorDTO.elevators = oldFloor.elevators.map(elevator => ElevatorMap.toDTO(elevator) as IElevatorDTO);
            }

            const floorOrError = await Floor.create(floorDTO);

            if (floorOrError.isFailure) {
                return Result.fail<IFloorDTO>(floorOrError.errorValue());
            }

            const updatedFloor = floorOrError.getValue();

            await this.floorRepo.updateNewFloorWithOldFloor(updatedFloor, oldFloorId)

            building.floors.push(updatedFloor);
            building.floors = building.floors.filter(existingFloor => existingFloor.floorId !== oldFloor.floorId);

            await this.buildingRepo.update(building);

            const floorDTOResult = FloorMap.toDTO(updatedFloor) as IFloorDTO;
            return Result.ok<IFloorDTO>(floorDTOResult);

        } catch (e) {
            throw e;
        }
    }

    public async deleteFloor(floorId: string): Promise<Result<boolean>> {
        try {
            const floor = await this.floorRepo.findByFloorId(floorId);

            if (floor === null) {
                return Result.fail<boolean>("Floor not found");
            }

            await this.floorRepo.delete(floorId);
            return Result.ok<boolean>(true);
        } catch (e) {
            throw e;
        }
    }

    public async getFloors(): Promise<Result<IFloorDTO[]>> {
        try {
            const floors = await this.floorRepo.getFloors();

            const floorDTOResult = floors.map( floor => FloorMap.toDTO( floor ) as IFloorDTO );

            return Result.ok<IFloorDTO[]>( floorDTOResult );
        } catch (e) {
            throw e;
        }
    }

    public async getConnections(buildingId: string): Promise<Result<IFloorDTO[]>> {
        try {
            const building = await this.buildingRepo.findByBuildingId(buildingId);

            if (building === null) {
                return Result.fail<IFloorDTO[]>("Building not found");
            }

            const floors = await this.floorRepo.getConnections(buildingId);

            const floorDTOResult = floors.map( floor => FloorMap.toDTO( floor ) as IFloorDTO );

            return Result.ok<IFloorDTO[]>( floorDTOResult );
        } catch (e) {
            throw e;
        }
    }

}