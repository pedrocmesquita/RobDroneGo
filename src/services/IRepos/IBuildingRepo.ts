import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/Building/building";

export default interface IBuildingRepo extends Repo<Building> {
  save(building: Building): Promise<Building>;
  findByBuildingId (buildingId: string): Promise<Building>;
  update(building: Building): Promise<Building>;
  delete(building: Building): Promise<Building>;
  getBuildings(): Promise<Building[]>;
    
  //findByIds (buildingsIds: BuildingId[]): Promise<Building[]>;
  //saveCollection (buildings: Building[]): Promise<Building[]>;
  //removeByBuildingIds (buildings: BuildingId[]): Promise<any>
}