import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/Building/building";
import { BuildingId } from "../../domain/Building/buildingId";

export default interface IBuildingRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  getBuildings(): Promise<Building[]>;
  findByBuildingId(buildingId: BuildingId | string): Promise<Building>;
  update(building: Building): Promise<Building>;
  delete(buildingId: BuildingId | string): void;
}