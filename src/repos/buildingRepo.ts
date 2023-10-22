import { Service, Inject } from "typedi";
import { Document, FilterQuery, Model } from "mongoose";
import { IBuildingPersistence } from "../dataschema/IBuildingPersistence";
import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import { Building } from "../domain/Building/building";
import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class BuildingRepo implements IBuildingRepo {
    private models: any;

    constructor(
        @Inject("buildingSchema") private buildingSchema: Model<IBuildingPersistence & Document>
    ) {}

    private createBaseQuery(): any {
        return {
            where: {}
        };
    }

    public async exists(building: Building): Promise<boolean> {
        const idX = building.id.toValue();

        const query = { buildingId: idX };
        const buildingDocument = await this.buildingSchema.findOne(
            query as FilterQuery<IBuildingPersistence & Document>
        );

        return !!buildingDocument === true;
    }

    public async save(building: Building): Promise<Building> {
        const query = { buildingId: building.id.toValue() };

        const roleDocument = await this.buildingSchema.findOne(query);

        try{
            if (roleDocument === null) {
                const rawBuilding: any = BuildingMap.toPersistence(building);

                const buildingCreated = await this.buildingSchema.create(rawBuilding);

                return BuildingMap.toDomain(buildingCreated);
            } else {
                roleDocument.buildingId = building.buildingId;
                await roleDocument.save();

                return building;
            }
        }
        catch(err){
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
        }
        return null;
    }

    public async update(building: Building): Promise<Building> {
        const query = { buildingId: building.buildingId };

        const buildingDocument = await this.buildingSchema.findOne(query);

        try {
            if (buildingDocument === null) {
                const rawBuilding: any = BuildingMap.toPersistence(building);

                const buildingCreated = await this.buildingSchema.create(rawBuilding);

                return BuildingMap.toDomain(buildingCreated);
            } else {
                buildingDocument.buildingId = building.buildingId;
                await buildingDocument.save();

                return building;
            }
        } catch (err) {
            throw err;
        }
    }

    public async delete(building: Building): Promise<Building> {
        const query = { buildingId: building.buildingId };

        const buildingDocument = await this.buildingSchema.findOne(query);

        try {
            if (buildingDocument === null) {
                const rawBuilding: any = BuildingMap.toPersistence(building);

                const buildingCreated = await this.buildingSchema.create(rawBuilding);

                return BuildingMap.toDomain(buildingCreated);
            } else {
                buildingDocument.buildingId = building.buildingId;
                await buildingDocument.save();

                return building;
            }
        } catch (err) {
            throw err;
    }
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
