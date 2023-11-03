import { Container, Service, Inject } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IBuildingService from "./IServices/IBuildingService";
import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import IBuildingDTO from "../dto/IBuildingDTO";
import { BuildingMap } from "../mappers/BuildingMap";
import { Building } from "../domain/Building/building";
import { floor } from "lodash";
import IFloorRepo from "./IRepos/IFloorRepo";
import { FloorMap } from "../mappers/FloorMap";
import IFloorDTO from "../dto/IFloorDTO";

@Service()
export default class BuildingService implements IBuildingService {
  constructor(
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo
  ) {
  }

  public async getBuildingsByFloors(min: string, max: string): Promise<Result<IBuildingDTO[]>> {
    try {
      const buildings = await this.buildingRepo.getBuildingsByFloors(min, max);

      const buildingDTOResult = buildings.map(building => BuildingMap.toDTO(building) as IBuildingDTO);

      return Result.ok<IBuildingDTO[]>(buildingDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getBuilding(buildingId: string): Promise<Result<IBuildingDTO>> {
    try {
      const building = await this.buildingRepo.findByBuildingId(buildingId);

      if (building === null) {
        return Result.fail<IBuildingDTO>("Building not found");
      } else {
        const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
        return Result.ok<IBuildingDTO>(buildingDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createBuilding(buildingId: string, buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const buildingId = await this.buildingRepo.findByBuildingId(buildingDTO.buildingId);

      // Check if building already exists
      if (buildingId != null) {
        return Result.fail<IBuildingDTO>("Building already exists: " + buildingDTO.buildingId);
      }

      // Initialize floors array
      buildingDTO.floors = [];

      // Create building entity
      const buildingOrError = await Building.create(buildingDTO);

      // Check if building entity was created successfully
      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }

      // Save building entity
      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.save(buildingResult);

      // Return building entity
      const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
    try {
      const exists = await this.buildingRepo.findByBuildingId(buildingDTO.buildingId);

      if (exists === null) {
        return Result.fail<IBuildingDTO>("Building not found");
      }

      const sizeOfFloors = exists.floors.length;

      // Check if the max number of floors has been reached
      if (sizeOfFloors > buildingDTO.buildingNumberOfFloors) {
        return Result.fail<IBuildingDTO>("Max number of floors reached for this building");
      }

      // Making sure the floors are not overwritten
      buildingDTO.floors = exists.floors.map(floor => FloorMap.toDTO(floor) as IFloorDTO);

      // Update building entity
      const buildingOrError = await Building.create(buildingDTO);

      // Check if building entity was updated successfully
      if (buildingOrError.isFailure) {
        return Result.fail<IBuildingDTO>(buildingOrError.errorValue());
      }

      // Save building entity
      const buildingResult = buildingOrError.getValue();

      await this.buildingRepo.update(buildingResult);

      // Return building entity
      const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
      return Result.ok<IBuildingDTO>(buildingDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getBuildings(): Promise<Result<IBuildingDTO[]>> {
    try {
      const buildings = await this.buildingRepo.getBuildings();

      const buildingDTOResult = buildings.map(building => BuildingMap.toDTO(building) as IBuildingDTO);

      return Result.ok<IBuildingDTO[]>(buildingDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async deleteBuilding(buildingId: string): Promise<Result<boolean>> {
    try {
      const exists = await this.buildingRepo.findByBuildingId(buildingId);

      if (exists === null) {
        return Result.fail<boolean>("Building not found");
      }

      await this.buildingRepo.delete(buildingId);

      return Result.ok<boolean>(true);
    } catch (e) {
      throw e;
    }
  }

}