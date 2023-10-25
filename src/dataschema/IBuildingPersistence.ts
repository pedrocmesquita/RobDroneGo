import { Floor } from "../domain/Building/floor";

export interface IBuildingPersistence {
    buildingId: string;
    buildingName: string;
    buildingNumberOfFloors: number;
    floors: Floor[];
}