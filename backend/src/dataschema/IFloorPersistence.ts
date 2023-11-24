import { Connection } from "../domain/Connection/connection";
import { Elevator } from "../domain/Elevator/elevator";
import { Room } from "../domain/Room/room";

export interface IFloorPersistence {
    floorId: string;
    buildingId: string;
    floorNumber: number;
    floorDescription: string;
    width?: number;
    height?: number;
    connections?: Connection[];
    rooms?: Room[];
    elevators?: Elevator[];
}