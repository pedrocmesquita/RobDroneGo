import { Result } from "../../core/logic/Result";
import IBuildingDTO from "../../dto/IBuildingDTO";

export default interface IBuildingService {
    createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
    getBuilding(buildingId: string): Promise<Result<IBuildingDTO>>;
    getBuildings(): Promise<Result<IBuildingDTO[]>>;
    deleteBuilding(buildingId: string): Promise<Result<boolean>>;
    updateBuilding(buildingId: string, buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
}