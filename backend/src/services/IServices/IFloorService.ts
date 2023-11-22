import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IFloorService {
    createFloor(floorId: string, buildingId: string, floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    getFloor(floorId: string): Promise<Result<IFloorDTO>>;
    getFloors(): Promise<Result<IFloorDTO[]>>;
    deleteFloor(floorId: string): Promise<Result<boolean>>;
    updateFloor(floorDTO: IFloorDTO, oldFloorId: string): Promise<Result<IFloorDTO>>;
    getConnections(buildingId: string): Promise<Result<IFloorDTO[]>>;
}