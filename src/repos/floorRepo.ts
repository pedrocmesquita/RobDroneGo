import {Service, Inject} from "typedi";
import {Document, FilterQuery, Model} from "mongoose";
import {IFloorPersistence} from "../dataschema/IFloorPersistence";
import IFloorRepo from "../services/IRepos/IFloorRepo";
import {Floor} from "../domain/Building/floor";
import {FloorMap} from "../mappers/FloorMap";
import e from "express";

@Service()
export default class FloorRepo implements IFloorRepo {
    private models: any;

    constructor(
        @Inject("floorSchema") private floorSchema: Model<IFloorPersistence & Document>
    ) {}

    private createBaseQuery(): any {
        return {
            where: {}
        };
    }

    public async exists(floor: Floor): Promise<boolean> {
        const idX = floor.floorId;

        const query = { floorId: idX };
        const floorDocument = await this.floorSchema.findOne(
            query as FilterQuery<IFloorPersistence & Document>
        );

        return !!floorDocument === true;
    }

    public async save(floor: Floor): Promise<Floor> {
        const query = { floorId: floor.floorId };

        const roleDocument = await this.floorSchema.findOne(query);

        try{
            if (roleDocument === null) {
                const rawFloor: any = FloorMap.toPersistence(floor);

                const floorCreated = await this.floorSchema.create(rawFloor);

                return FloorMap.toDomain(floorCreated);
            } else {
                roleDocument.floorId = floor.floorId;
                await roleDocument.save();

                return floor;
            }
        }
        catch(err){
            throw err;
        }
    }

    public async findByFloorId(floorId: string): Promise<Floor> {
        const query = { floorId: floorId };
        const floorRecord = await this.floorSchema.findOne(
            query as FilterQuery<IFloorPersistence & Document>
        );

        if (floorRecord != null) {
            return FloorMap.toDomain(floorRecord);
        }
        else {
            return null;
        }
    }

    public async update(floor: Floor): Promise<Floor> {
        const query = { floorId: floor.floorId };

        const floorDocument = await this.floorSchema.findOne(query);

        if (floorDocument != null) {
            const update = { floorNumber: floor.floorNumber };
            await this.floorSchema.updateOne(query, update);
            return floor;
        }
        else {
            return null;
        }
    }

    public async delete(floor: Floor): Promise<Floor> {
        const query = { floorId: floor.floorId };

        const floorDocument = await this.floorSchema.findOne(query);

        if (floorDocument != null) {
            await this.floorSchema.deleteOne(query);
            return floor;
        }
        else {
            return null;
        }
    }

    public async getFloors(): Promise<Floor[]> {
        const floors = await this.floorSchema.find();

        const floorDTOResult = floors.map( floor => FloorMap.toDomain( floor ) as Floor );

        return floorDTOResult;
    }

    public async getFloorsByBuildingId(buildingId: string): Promise<Floor[]> {
        const query = { buildingId: buildingId };
        const floors = await this.floorSchema.find(
            query as FilterQuery<IFloorPersistence & Document>
        );

        const floorDTOResult = floors.map( floor => FloorMap.toDomain( floor ) as Floor );

        return floorDTOResult;
    }
}
    