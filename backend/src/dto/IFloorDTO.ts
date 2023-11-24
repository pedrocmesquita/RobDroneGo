import IConnectionDTO from "./IConnectionDTO";
import IRoomDTO from "./IRoomDTO";
import IElevatorDTO from "./IElevatorDTO";

export default interface IFloorDTO {
    buildingId: string;
    floorNumber: number;
    floorId: string;
    floorDescription?: string;
    width?: number;
    height?: number;
    connections?: IConnectionDTO[];
    rooms?: IRoomDTO[];
    elevators?: IElevatorDTO[];
}
