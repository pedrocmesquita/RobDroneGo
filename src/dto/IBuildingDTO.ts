import IFloorDTO from "./IFloorDTO";
import {Floor} from "../domain/Floor/floor";
import IElevatorDTO from "./IElevatorDTO";

export default interface IBuildingDTO {
    buildingId: string;
    buildingName: string;
    buildingDescription?: string;
    buildingNumberOfFloors: number;
    dimX: number;
    dimY: number;
    floors?: IFloorDTO[];
    elevators?: IElevatorDTO[];
}