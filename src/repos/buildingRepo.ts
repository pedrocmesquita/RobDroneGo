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
        @Inject("buildingSchema") private buildingSchema: Model<IBuildingPersistence & Document>
    ) {}

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
                buildingDocument.floors = building.floors;
                await buildingDocument.save();

                return building;
            }
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    public async findByBuildingId(buildingId: string): Promise<Building> {
        const query = { buildingId: buildingId };
        const buildingRecord = await this.buildingSchema.findOne(
            query as FilterQuery<IBuildingPersistence & Document>
        );

        if (buildingRecord != null) {
            return BuildingMap.toDomain(buildingRecord);
        } else return null;
    }

    public async update(building: Building): Promise<Building> {
        await this.buildingSchema.updateOne( { buildingId: building.buildingId.buildingId }, BuildingMap.toDTO(building));

        const updatedBuilding = await this.buildingSchema.findOne({ buildingId: building.buildingId.buildingId });

        return BuildingMap.toDomain(updatedBuilding);
    }

    public async delete(buildingId: BuildingId | string) {
        const query = { buildingId: buildingId };
        await this.buildingSchema.deleteOne(query as FilterQuery<IBuildingPersistence & Document>);
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
}
