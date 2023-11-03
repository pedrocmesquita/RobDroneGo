import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/Floor/floor";

export default interface IFloorRepo extends Repo<Floor> {
    save(floor: Floor): Promise<Floor>;
    findByFloorId (floorId: string): Promise<Floor>;
    update(floor: Floor, oldFloorId: string): Promise<Floor>;
    updateConnections(floor: Floor): Promise<Floor>;
    delete(floorId: string): void;
    getFloors(): Promise<Floor[]>;
}