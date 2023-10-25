import { Result } from "../../core/logic/Result";
import IFloorDTO from "../../dto/IFloorDTO";

export default interface IFloorService {
    createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
    getFloor(floorId: string): Promise<Result<IFloorDTO>>;
    getFloors(): Promise<Result<IFloorDTO[]>>;
    deleteFloor(floorId: string): Promise<Result<boolean>>;
    updateFloor(floorId: string, floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
}