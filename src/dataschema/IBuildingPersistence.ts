import { Floor } from "../domain/Floor/floor";

export interface IBuildingPersistence {
    buildingId: string;
    buildingName: string;
    buildingDescription: string;
    buildingNumberOfFloors: number;
    floors?: Floor[];
}