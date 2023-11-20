import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/Floor/floor";

export default interface IFloorRepo extends Repo<Floor> {
    save(floor: Floor): Promise<Floor>;
    findByFloorId (floorId: string): Promise<Floor>;
    updateNewFloorWithOldFloor(floor: Floor, oldFloorId: string): Promise<Floor>;
    update(floor: Floor): Promise<Floor>;
    delete(floorId: string): void;
    getFloors(): Promise<Floor[]>;
    getConnections(buildingId: string): Promise<Floor[]>;
    deleteAllConnectionsFromFloor(floorId: string): void;
    findAllAttendedFloors(attendedFloors: string[]): Promise<Floor[]>;
}