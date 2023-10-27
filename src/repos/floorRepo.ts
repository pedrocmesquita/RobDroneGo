import {Service, Inject} from "typedi";
import {Document, FilterQuery, Model} from "mongoose";
import {IFloorPersistence} from "../dataschema/IFloorPersistence";
import IFloorRepo from "../services/IRepos/IFloorRepo";
import {Floor} from "../domain/Floor/floor";
import {FloorMap} from "../mappers/FloorMap";
import e from "express";

@Service()
export default class FloorRepo implements IFloorRepo {

    constructor(
        @Inject("floorSchema") private floorSchema: Model<IFloorPersistence & Document>
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
        await this.floorSchema.updateOne({ floorId: floor.floorId }, FloorMap.toDTO(floor));

        const updatedFloor = await this.floorSchema.findOne({ floorId: floor.floorId });

        return FloorMap.toDomain(updatedFloor);
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

    public async getFloorsByBuildingId(buildingId: string): Promise<Floor[]> {
        const query = { buildingId: buildingId };
        const floors = await this.floorSchema.find(
            query as FilterQuery<IFloorPersistence & Document>
        );

        const floorDTOResult = floors.map( floor => FloorMap.toDomain( floor ) as Floor );

        return floorDTOResult;
    }
}
    