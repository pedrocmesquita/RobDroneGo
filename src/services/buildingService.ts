import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import IBuildingService from './IServices/IBuildingService';
import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import IBuildingDTO from '../dto/IBuildingDTO';
import { BuildingMap } from "../mappers/BuildingMap";
import { Building } from '../domain/Building/building';

@Service()
export default class BuildingService implements IBuildingService {
    constructor(
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
    ) {}

    public async getBuilding(buildingId: string): Promise<Result<IBuildingDTO>> {
        try {
            const building = await this.buildingRepo.findByBuildingId(buildingId);

            if (building === null) {
                return Result.fail<IBuildingDTO>("Building not found");
            }
            else {
                const buildingDTOResult = BuildingMap.toDTO( building ) as IBuildingDTO;
                return Result.ok<IBuildingDTO>( buildingDTOResult )
            }
        } catch (e) {
            throw e;
        }
    }

    public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {
            const buildingOrError = await Building.create( buildingDTO );

            if (buildingOrError.isFailure) {
                return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
            }

            const buildingResult = buildingOrError.getValue();
            
            console.log("1 - ", buildingResult);

            await this.buildingRepo.save(buildingResult);

            const buildingDTOResult = BuildingMap.toDTO( buildingResult ) as IBuildingDTO;
            return Result.ok<IBuildingDTO>( buildingDTOResult )
        } catch (e) {
            throw e;
        }
    }

    public async updateBuilding(buildingId: string, buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {
            const building = await this.buildingRepo.findByBuildingId(buildingId);

            if (building === null) {
                return Result.fail<IBuildingDTO>("Building not found");
            }
            else {
                building.buildingId = buildingDTO.buildingId;
                await this.buildingRepo.save(building);

                const buildingDTOResult = BuildingMap.toDTO( building ) as IBuildingDTO;
                return Result.ok<IBuildingDTO>( buildingDTOResult )
            }
        } catch (e) {
            throw e;
        }
    }

    public async getBuildings(): Promise<Result<IBuildingDTO[]>> {
        try {
            const buildings = await this.buildingRepo.getBuildings();

            const buildingDTOResult = buildings.map( building => BuildingMap.toDTO( building ) as IBuildingDTO );

            return Result.ok<IBuildingDTO[]>( buildingDTOResult );
        } catch (e) {
            throw e;
        }
    }

    public async deleteBuilding(buildingId: string): Promise<Result<boolean>> {
        try {
            const building = await this.buildingRepo.findByBuildingId(buildingId);

            if (building === null) {
                return Result.fail<boolean>("Building not found");
            }
            else {
                await this.buildingRepo.delete(building);

                return Result.ok<boolean>(true);
            }
        } catch (e) {
            throw e;
        }
    }
}