import IFloorDTO from "./IFloorDTO";
import {Floor} from "../domain/Floor/floor";

export default interface IBuildingDTO {
    buildingId: string;
    buildingName: string;
    buildingDescription?: string;
    buildingNumberOfFloors: number;
    dimX: number;
    dimY: number;
    floors?: IFloorDTO[];
}