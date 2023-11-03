import { Connection } from "../domain/Connection/connection";

export interface IFloorPersistence {
    floorId: string;
    buildingId: string;
    floorNumber: number;
    floorDescription: string;
    connections?: Connection[];
}