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

            const buildingId = await this.buildingRepo.findByBuildingId(floorDTO.buildingId);

            if (buildingId === null) {
                return Result.fail<IFloorDTO>("Building not found");
            }

            const floorId = await this.floorRepo.findByFloorId(floorDTO.floorId);

            // Check if floor already exists
            if (floorId != null) {
                return Result.fail<IFloorDTO>('Floor already exists: ' + floorDTO.floorId);
            }

            console.log("\nFloor DTO \n");
            console.log(floorDTO);
            console.log("\nBefore creating \n");
            console.log(floorId);

            // Create floor entity
            const floorOrError = await Floor.create(floorDTO);

            console.log("\nAfter creating \n");
            console.log(floorOrError);

            // Check if floor entity was created successfully
            if (floorOrError.isFailure) {
                return Result.fail<IFloorDTO>(floorOrError.errorValue());
            }

            // Save floor entity
            const floorResult = floorOrError.getValue();

            console.log("\nFloor Result \n");
            console.log(floorResult.floorId);
            await this.floorRepo.save(floorResult);

            // Return floor entity
            const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;

            buildingId.addFloor(floorResult);
            await this.buildingRepo.update(buildingId)

            return Result.ok<IFloorDTO>(floorDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async updateFloor(floorDTO: IFloorDTO, oldFloorId: string): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByFloorId(oldFloorId);

            if (floor === null) {
                return Result.fail<IFloorDTO>("Floor not found");
            }

            // Verify if the new floor number is already in use
            const floorNumberExists = await this.floorRepo.findByFloorId(floorDTO.floorId);

            if (floorNumberExists != null) {
                return Result.fail<IFloorDTO>("Floor number already in use for this building");
            }

            const buildingId = await this.buildingRepo.findByBuildingId(floorDTO.buildingId);

            // Remove and add floor to building
            buildingId.removeFloor(floor);
            buildingId.addFloor(FloorMap.toDomain(floorDTO));

            await this.buildingRepo.update(buildingId);

            const updatedFloor = await this.floorRepo.update(FloorMap.toDomain(floorDTO), oldFloorId);
            const floorDTOResult = FloorMap.toDTO( updatedFloor ) as IFloorDTO;
            return Result.ok<IFloorDTO>( floorDTOResult );

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

    public async getFloorsByBuildingId(buildingId: string): Promise<Result<IFloorDTO[]>> {
        try {
            const floors = await this.floorRepo.getFloorsByBuildingId(buildingId);

            const floorDTOResult = floors.map( floor => FloorMap.toDTO( floor ) as IFloorDTO );

            return Result.ok<IFloorDTO[]>( floorDTOResult );
        } catch (e) {
            throw e;
        }
    }

}