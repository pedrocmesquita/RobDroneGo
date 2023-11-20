import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/Building/building";
import { BuildingId } from "../../domain/Building/buildingId";

export default interface IBuildingRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  getBuildings(): Promise<Building[]>;
  findByBuildingId(buildingId: BuildingId | string): Promise<Building>;
  update(building: Building): Promise<Building>;
  delete(buildingId: string): Promise<void>;
  getBuildingsByFloors(min: string, max: string): Promise<Building[]>;
  updateConnections(building: Building): Promise<Building>;
  updateRooms(building: Building): Promise<Building>;
  deleteAllConnectionsFromBuilding(buildingId: string): void;

}