import { Floor } from "../domain/Floor/floor";
import { Elevator } from "../domain/Elevator/elevator";

export interface IBuildingPersistence {
    buildingId: string;
    buildingName: string;
    buildingDescription: string;
    buildingNumberOfFloors: number;
    dimX: number;
    dimY: number;
    floors?: Floor[];
}