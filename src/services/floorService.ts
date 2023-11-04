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

@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
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

            floorDTO.connections = [];
            floorDTO.rooms = [];

            const floor = await this.floorRepo.findByFloorId(floorDTO.floorId);

            // Check if floor already exists
            if (floor != null) {
                return Result.fail<IFloorDTO>('Floor already exists: ' + floorDTO.floorId);
            }

            // Check if the max number of floors has been reached
            if (building.floors.length >= building.buildingNumberOfFloors.buildingNumberOfFloors) {
                return Result.fail<IFloorDTO>("Max number of floors reached for this building");
            }

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
            const floor = await this.floorRepo.findByFloorId(oldFloorId);

            if (floor === null) {
                return Result.fail<IFloorDTO>("Floor not found");
            }

            // Check if the new floorId is already taken
            const floorId = await this.floorRepo.findByFloorId(floorDTO.floorId);

            if (floorId != null) {
                return Result.fail<IFloorDTO>("FloorId already taken");
            }

            // Check if oldFloorNumber and newFloorNumber are the same
            if (floorDTO.floorNumber === floor.floorNumber.floorNumber) {
                floorDTO.connections = floor.connections.map(connection => ConnectionMap.toDTO(connection) as IConnectionDTO);

                const floorOrError = await Floor.create(floorDTO);

                if (floorOrError.isFailure) {
                    return Result.fail<IFloorDTO>(floorOrError.errorValue());
                }

                const updatedFloor = floorOrError.getValue();

                await this.floorRepo.update(updatedFloor);

                // Add new floor to building and delete old floor
                const building = await this.buildingRepo.findByBuildingId(floorDTO.buildingId);

                if (building === null) {
                    return Result.fail<IFloorDTO>("Building not found");
                }

                building.floors.push(updatedFloor);
                building.floors = building.floors.filter(existingFloor => existingFloor.floorId !== floor.floorId);

                await this.buildingRepo.update(building);

                // Return floor entity
                const floorDTOResult = FloorMap.toDTO(updatedFloor) as IFloorDTO;
                return Result.ok<IFloorDTO>(floorDTOResult);
            }
            else {

                const pairConnection = floor.connections.find(connection => connection.buildingtoId === floorDTO.buildingId || connection.buildingfromId === floorDTO.buildingId);

                if (pairConnection.buildingtoId === floorDTO.buildingId) {

                    const otherFloor = await this.floorRepo.findByFloorId(pairConnection.floortoId);
                    const otherBuilding = await this.buildingRepo.findByBuildingId(otherFloor.buildingId);

                    floorDTO.connections = [];
                    floorDTO.rooms = [];
                    const floorOrError = await Floor.create(floorDTO);

                    if (floorOrError.isFailure) {
                        return Result.fail<IFloorDTO>(floorOrError.errorValue());
                    }

                    const updatedFloor = floorOrError.getValue();

                    await this.floorRepo.updateNewFloorWithOldFloor(updatedFloor, oldFloorId);

                    // Remove this connection from the other floor
                    otherFloor.connections = otherFloor.connections.filter(existingConnection => existingConnection.connectionId !== pairConnection.connectionId);
                    await this.floorRepo.update(otherFloor);

                    // Remove this connection from the other building
                    otherBuilding.floors.push(otherFloor);
                    otherBuilding.floors = otherBuilding.floors.filter(existingFloor => existingFloor.floorId !== otherFloor.floorId);
                    await this.buildingRepo.update(otherBuilding);

                    // Add new floor to building and delete old floor
                    const building = await this.buildingRepo.findByBuildingId(floorDTO.buildingId);

                    if (building === null) {
                        return Result.fail<IFloorDTO>("Building not found");
                    }

                    building.floors.push(updatedFloor);
                    building.floors = building.floors.filter(existingFloor => existingFloor.floorId !== floor.floorId);

                    await this.buildingRepo.update(building);

                    // Return floor entity
                    const floorDTOResult = FloorMap.toDTO(updatedFloor) as IFloorDTO;
                    return Result.ok<IFloorDTO>(floorDTOResult);
                }
                if (pairConnection.buildingfromId === floorDTO.buildingId){

                }


            }
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