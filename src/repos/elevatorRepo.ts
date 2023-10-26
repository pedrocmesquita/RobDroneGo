import {Service, Inject} from "typedi";
import {Document, FilterQuery, Model} from "mongoose";
import {IElevatorPersistence} from "../dataschema/IElevatorPersistence";
import IElevatorRepo from "../services/IRepos/IElevatorRepo";
import {Elevator} from "../domain/Building/elevator";
import {ElevatorMap} from "../mappers/ElevatorMap";
import e from "express";

@Service()
export default class ElevaatorRepo implements IElevatorRepo {
    private models: any;

    constructor(
        @Inject("elevatorSchema") private elevatorSchema: Model<IElevatorPersistence & Document>
    ) {}

    private createBaseQuery(): any {
        return {
            where: {}
        };
    }

    public async exists(elevator: Elevator): Promise<boolean> {
        const idX = elevator.elevatorId;

        const query = { elevatorId: idX };
        const elevatorDocument = await this.elevatorSchema.findOne(
            query as FilterQuery<IElevatorPersistence & Document>
        );

        return !!elevatorDocument === true;
    }

    public async save(elevator: Elevator): Promise<Elevator> {
        const query = { elevatorId: elevator.elevatorId };

        const roleDocument = await this.elevatorSchema.findOne(query);

        try{
            if (roleDocument === null) {
                const rawElevator: any = ElevatorMap.toPersistence(elevator);

                const elevatorCreated = await this.elevatorSchema.create(rawElevator);

                return ElevatorMap.toDomain(elevatorCreated);
            } else {
                roleDocument.elevatorId = elevator.elevatorId;
                await roleDocument.save();

                return elevator;
            }
        }
        catch(err){
            throw err;
        }
    }

    public async findByElevatorId(elevatorId: string): Promise<Elevator> {
        const query = { elevatorId: elevatorId };
        const elevatorRecord = await this.elevatorSchema.findOne(
            query as FilterQuery<IElevatorPersistence & Document>
        );

        if (elevatorRecord != null) {
            return ElevatorMap.toDomain(elevatorRecord);
        }
        else {
            return null;
        }
    }

    public async update(elevator: Elevator): Promise<Elevator> {
        const query = { elevatorId: elevator.elevatorId };

        const elevatorDocument = await this.elevatorSchema.findOne(query);

        if (elevatorDocument != null) {
            const update = { currentFloor: elevator.currentFloor };
            await this.elevatorSchema.updateOne(query, update);
            return elevator;
        }
        else {
            return null;
        }
    }

    public async delete(elevator: Elevator): Promise<Elevator> {
        const query = { elevatorId: elevator.elevatorId };

        const elevatorDocument = await this.elevatorSchema.findOne(query);

        if (elevatorDocument != null) {
            await this.elevatorSchema.deleteOne(query);
            return elevator;
        }
        else {
            return null;
        }
    }

    public async getElevators(): Promise<Elevator[]> {
        const elevators = await this.elevatorSchema.find();

        const elevatorDTOResult = elevators.map( elevator => ElevatorMap.toDomain( elevator ) as Elevator );

        return elevatorDTOResult;
    }

    public async getElevatorsByBuildingId(buildingId: string): Promise<Elevator[]> {
        const query = { buildingId: buildingId };
        const elevators = await this.elevatorSchema.find(
            query as FilterQuery<IElevatorPersistence & Document>
        );

        const elevatorDTOResult = elevators.map( elevator => ElevatorMap.toDomain( elevator ) as Elevator );

        return elevatorDTOResult;
    }
}
    