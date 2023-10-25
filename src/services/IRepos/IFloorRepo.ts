import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/Building/floor";

export default interface IFloorRepo extends Repo<Floor> {
    save(floor: Floor): Promise<Floor>;
    findByFloorId (floorId: string): Promise<Floor>;
    update(floor: Floor): Promise<Floor>;
    delete(floor: Floor): Promise<Floor>;
    getFloors(): Promise<Floor[]>;
    getFloorsByBuildingId(buildingId: string): Promise<Floor[]>;
}