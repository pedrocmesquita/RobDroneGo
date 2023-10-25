import IFloorDTO from "./IFloorDTO";
import {Floor} from "../domain/Building/floor";

export default interface IBuildingDTO {
    buildingId: string;
    buildingName: string;
    buildingNumberOfFloors: number;
    floors: Floor[];
}