import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import IFloorService from './IServices/IFloorService';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import IFloorDTO from '../dto/IFloorDTO';
import { FloorMap } from "../mappers/FloorMap";
import { Floor } from '../domain/Building/floor';

@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
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

    public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            const floorOrError = await Floor.create( floorDTO );

            if (floorOrError.isFailure) {
                return Result.fail<IFloorDTO>(floorOrError.errorValue());
            }

            const floorResult = floorOrError.getValue();
            
            console.log("1 - ", floorResult);

            await this.floorRepo.save(floorResult);

            const floorDTOResult = FloorMap.toDTO( floorResult ) as IFloorDTO;
            return Result.ok<IFloorDTO>( floorDTOResult )
        } catch (e) {
            throw e;
        }
    }

    public async updateFloor(floorId: string, floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByFloorId(floorId);

            if (floor === null) {
                return Result.fail<IFloorDTO>("Floor not found");
            }
            else {
                const floorOrError = await Floor.create( floorDTO );

                if (floorOrError.isFailure) {
                    return Result.fail<IFloorDTO>(floorOrError.errorValue());
                }

                const floorResult = floorOrError.getValue();

                floorResult.floorId = floor.floorId;

                await this.floorRepo.update(floorResult);

                const floorDTOResult = FloorMap.toDTO( floorResult ) as IFloorDTO;
                return Result.ok<IFloorDTO>( floorDTOResult )
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
            else {
                await this.floorRepo.delete(floor);

                return Result.ok<boolean>( true )
            }
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