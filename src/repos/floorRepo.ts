import {Service, Inject} from "typedi";
import {Document, FilterQuery, Model} from "mongoose";
import {IFloorPersistence} from "../dataschema/IFloorPersistence";
import IFloorRepo from "../services/IRepos/IFloorRepo";
import {Floor} from "../domain/Floor/floor";
import {FloorMap} from "../mappers/FloorMap";
import e from "express";
import { BuildingMap } from "../mappers/BuildingMap";

@Service()
export default class FloorRepo implements IFloorRepo {

    constructor(
        @Inject("floorSchema") private floorSchema: Model<IFloorPersistence & Document>,
        @Inject("buildingSchema") private buildingSchema: Model<IFloorPersistence & Document>
    ) {}

    // @ts-ignore
    public async exists(floorId: string): Promise<boolean> {
        const idX = floorId;

        const query = { domainId: idX };
        const floorDocument = await this.floorSchema.findOne(query);

        return !!floorDocument === true;
    }

    public async save(floor: Floor): Promise<Floor> {
        const query = { floorId: floor.floorId };

        const roleDocument = await this.floorSchema.findOne(query);

        try{
            if (roleDocument === null) {
                const rawFloor: any = FloorMap.toPersistence(floor);
                console.log(rawFloor);

                const floorCreated = await this.floorSchema.create(rawFloor);

                return FloorMap.toDomain(floorCreated);
            } else {
                roleDocument.floorId = floor.floorId;
                roleDocument.buildingId = floor.buildingId;
                roleDocument.floorNumber = floor.floorNumber.floorNumber;
                roleDocument.floorDescription = floor.floorDescription.floorDescription;
                await roleDocument.save();

                return floor;
            }
        }
        catch(err){
            console.log(err)
            throw err;
        }
    }

    public async findByFloorId(floorId: string): Promise<Floor> {
        const idX = floorId;

        const query = { floorId: idX };
        const floorRecord = await this.floorSchema.findOne(query);

        if (floorRecord != null) {
            const floor = FloorMap.toDomain(floorRecord);
            return floor;
        }
        else {
            return null;
        }
    }

    public async update(floor: Floor, oldFloorId: string): Promise<Floor> {
        const query = { floorId: oldFloorId };

        const floorDocument = await this.floorSchema.findOne(query);

        if (floorDocument != null) {
            floorDocument.floorId = floor.floorId;
            floorDocument.buildingId = floor.buildingId;
            floorDocument.floorNumber = floor.floorNumber.floorNumber;
            floorDocument.floorDescription = floor.floorDescription.floorDescription;
            await floorDocument.save();

            return floor;
        }
        else {
            return null;
        }
    }

    public async delete(floorId: string){
        const query = { floorId: floorId };
        await this.floorSchema.deleteOne(query as FilterQuery<IFloorPersistence & Document>);
    }

    public async getFloors(): Promise<Floor[]> {
        const floors = await this.floorSchema.find();

        const floorDTOResult = floors.map( floor => FloorMap.toDomain( floor ) as Floor );

        return floorDTOResult;
    }

}
    