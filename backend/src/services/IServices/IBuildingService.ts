import { Result } from "../../core/logic/Result";
import IBuildingDTO from "../../dto/IBuildingDTO";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IBuildingService {
    createBuilding(buildingId: string, buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
    getBuilding(buildingId: string): Promise<Result<IBuildingDTO>>;
    getBuildings(): Promise<Result<IBuildingDTO[]>>;
    deleteBuilding(buildingId: string): Promise<Result<boolean>>;
    updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
    getBuildingsByFloors(min: string, max: string): Promise<Result<IBuildingDTO[]>>;
    updateBuildingDescription(buildingId: string, buildingDescription: string): Promise<Result<IBuildingDTO>>;
    updateBuildingName(buildingId: string, buildingName: string): Promise<Result<IBuildingDTO>>;
    updateBuildingNumberOfFloors(buildingId: string, buildingNumberOfFloors: number): Promise<Result<IBuildingDTO>>;

}