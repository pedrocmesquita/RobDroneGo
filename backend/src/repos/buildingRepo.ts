import { Service, Inject } from "typedi";
import { Document, FilterQuery, Model } from "mongoose";
import { IBuildingPersistence } from "../dataschema/IBuildingPersistence";
import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import { Building } from "../domain/Building/building";
import { BuildingMap } from "../mappers/BuildingMap";
import { BuildingId } from "../domain/Building/buildingId";

@Service()
export default class BuildingRepo implements IBuildingRepo {

  constructor(
    @Inject("buildingSchema") private buildingSchema: Model<IBuildingPersistence & Document>,
    @Inject("floorSchema") private floorSchema: Model<IBuildingPersistence & Document>,
    @Inject("elevatorSchema") private elevatorSchema: Model<IBuildingPersistence & Document>
  ) {
  }

  // @ts-ignore
  public async exists(buildingId: BuildingId | string): Promise<boolean> {
    const idX = buildingId instanceof BuildingId ? (<BuildingId>buildingId).buildingId : buildingId;

    const query = { domainId: idX };
    const buildingDocument = await this.buildingSchema.findOne(query);

    return !!buildingDocument === true;
  }

  public async save(building: Building): Promise<Building> {
    const query = { buildingId: building.buildingId.buildingId };

    const buildingDocument = await this.buildingSchema.findOne(query);

    try {
      if (buildingDocument === null) {
        const rawBuilding: any = BuildingMap.toPersistence(building);
        console.log(rawBuilding);

        const buildingCreated = await this.buildingSchema.create(rawBuilding);

        return BuildingMap.toDomain(buildingCreated);
      } else {
        buildingDocument.buildingId = building.buildingId.buildingId;
        buildingDocument.buildingName = building.buildingName.buildingName;
        buildingDocument.buildingDescription = building.buildingDescription.buildingDescription;
        buildingDocument.buildingNumberOfFloors = building.buildingNumberOfFloors.buildingNumberOfFloors;
        buildingDocument.dimX = building.dimX;
        buildingDocument.dimY = building.dimY;
        buildingDocument.floors = building.floors;
        await buildingDocument.save();

        return building;
      }
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  public async findByBuildingId(buildingId: BuildingId | string): Promise<Building> {
    const idX = buildingId instanceof BuildingId ? (<BuildingId>buildingId).buildingId : buildingId;

    const query = { buildingId: idX };
    const buildingRecord = await this.buildingSchema.findOne(query);

    if (buildingRecord != null) {
      return BuildingMap.toDomain(buildingRecord);
    }

    return null;
  }

  public async update(building: Building): Promise<Building> {
    await this.buildingSchema.updateOne({ buildingId: building.buildingId.buildingId }, BuildingMap.toDTO(building));

    const updatedBuilding = await this.buildingSchema.findOne({ buildingId: building.buildingId.buildingId });

    return BuildingMap.toDomain(updatedBuilding);
  }

  public async updateConnections(building: Building): Promise<Building> {
    await this.buildingSchema.findOneAndUpdate({ buildingId: building.buildingId.buildingId }, BuildingMap.toDTO(building));

    const updatedBuilding = await this.buildingSchema.findOne({ buildingId: building.buildingId.buildingId });

    return BuildingMap.toDomain(updatedBuilding);
  }

  public async updateRooms(building: Building): Promise<Building> {
    await this.buildingSchema.findOneAndUpdate({ buildingId: building.buildingId.buildingId }, BuildingMap.toDTO(building));

    const updatedBuilding = await this.buildingSchema.findOne({ buildingId: building.buildingId.buildingId });

    return BuildingMap.toDomain(updatedBuilding);
  }

  // Before deleting the building, delete all floors associated with the building
  public async delete(buildingId: string): Promise<void> {

    const query = { buildingId: buildingId };
    const buildingRecord = await this.buildingSchema.findOne(query);

    if (buildingRecord != null) {
      const floors = buildingRecord.floors;
      for (var i = 0; i < floors.length; i++) {
        const floorId = floors[i].floorId;
        await this.floorSchema.deleteOne({ floorId: floorId });
      }
    } else {
      throw new Error("Building not found");
    }

    await this.buildingSchema.deleteOne({ buildingId: buildingId });
  }

  public async getBuildings(): Promise<Building[]> {
    try {
      const buildings = await this.buildingSchema.find();

      const buildingDTOResult = buildings.map(building => BuildingMap.toDomain(building));

      return buildingDTOResult;
    } catch (e) {
      throw e;
    }
  }

  public async getBuildingsByFloors(min: string, max: string): Promise<Building[]> {
    try {
      const buildings = await this.buildingSchema.find({ buildingNumberOfFloors: { $gte: min, $lte: max } });

      const buildingDTOResult = buildings.map(building => BuildingMap.toDomain(building));

      return buildingDTOResult;
    } catch (e) {
      throw e;
    }
  }

  public async deleteAllConnectionsFromBuilding(connectionId: string) {
    const buildings = await this.buildingSchema.find({ connections: { $elemMatch: { connectionId: connectionId } } });

    for (var i = 0; i < buildings.length; i++) {
      const building = buildings[i];
      const floors = building.floors;
      //Loop through floors because they have connections
      for (var j = 0; j < floors.length; j++) {
        const floor = floors[j];
        let connections = floor.connections;
        //Create a new array of connections that does not include the connection to be deleted
        connections = connections.filter(connection => connection.connectionId !== connectionId);
        //Update floor with the new connections array
        await this.floorSchema.findOneAndUpdate({ floorId: floor.floorId }, { $set: { connections: connections } });
      }
      //Update building
      await this.buildingSchema.findOneAndUpdate({ buildingId: building.buildingId }, { $set: { floors: floors } });
    }
  }
}
