import { Service, Inject } from "typedi";
import { Document, FilterQuery, Model } from "mongoose";
import { IElevatorPersistence } from "../dataschema/IElevatorPersistence";
import IElevatorRepo from "../services/IRepos/IElevatorRepo";
import { Elevator } from "../domain/Elevator/elevator";
import { ElevatorMap } from "../mappers/ElevatorMap";
import { ElevatorId } from "../domain/Elevator/elevatorId";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";

@Service()
export default class ElevatorRepo implements IElevatorRepo {

    constructor(
      @Inject("elevatorSchema") private elevatorSchema: Model<IElevatorPersistence & Document>,
      @Inject("floorSchema") private floorSchema: Model<IElevatorPersistence & Document>
    ) {}

    // @ts-ignore
    public async exists(elevatorId: ElevatorId | string): Promise<boolean> {
        const idX = elevatorId instanceof ElevatorId ? (<ElevatorId>elevatorId).elevatorId : elevatorId;

        const query = { domainId: idX };
        const elevatorDocument = await this.elevatorSchema.findOne(query);

        return !!elevatorDocument === true;
    }

    public async save(elevator: Elevator): Promise<Elevator> {
        const query = { elevatorId: elevator.elevatorId.elevatorId };

        const elevatorDocument = await this.elevatorSchema.findOne(query);

        try {
            if (elevatorDocument === null) {
                const rawElevator: any = ElevatorMap.toPersistence(elevator);
                console.log(rawElevator);

                const elevatorCreated = await this.elevatorSchema.create(rawElevator);

                return ElevatorMap.toDomain(elevatorCreated);
            } else {
                elevatorDocument.elevatorId = elevator.elevatorId.elevatorId;
                elevatorDocument.floorsAttended = elevator.floorsAttended;
                elevatorDocument.elevatorBrand = elevator.elevatorBrand.elevatorBrand;
                elevatorDocument.elevatorModel = elevator.elevatorModel.elevatorModel;
                elevatorDocument.elevatorSerNum = elevator.elevatorSerNum.elevatorSerNum;
                elevatorDocument.elevatorDesc = elevator.elevatorDesc.elevatorDesc;
                elevatorDocument.currentFloor = elevator.currentFloor.currentFloor;
                elevatorDocument.locationX = elevator.locationX.locationX;
                elevatorDocument.locationY = elevator.locationY.locationY;
                await elevatorDocument.save();

                return elevator;
            }
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    public async findByElevatorId(elevatorId: ElevatorId | string): Promise<Elevator> {
        const idX = elevatorId instanceof ElevatorId ? (<ElevatorId>elevatorId).elevatorId : elevatorId;

        const query = { elevatorId: idX };
        const elevatorRecord = await this.elevatorSchema.findOne(query);

        if (elevatorRecord != null) {
            return ElevatorMap.toDomain(elevatorRecord);
        }

        return null;
    }

    public async update(elevator: Elevator): Promise<Elevator> {
        await this.elevatorSchema.updateOne( { elevatorId: elevator.elevatorId.elevatorId }, ElevatorMap.toDTO(elevator));

        const updatedElevator = await this.elevatorSchema.findOne({ elevatorId: elevator.elevatorId.elevatorId });

        return ElevatorMap.toDomain(updatedElevator);
    }

    // Before deleting the elevator, delete all floors associated with the elevator
    public async delete(elevatorId: string): Promise<void> {

        const query = { elevatorId: elevatorId };
        await this.elevatorSchema.deleteOne(query as FilterQuery<IElevatorPersistence & Document>);
    }

    public async getElevators(): Promise<Elevator[]> {
        try {
            const elevators = await this.elevatorSchema.find();

            const elevatorDTOResult = elevators.map(elevator => ElevatorMap.toDomain(elevator));

            return elevatorDTOResult;
        } catch (e) {
            throw e;
        }
    }

    public async getElevatorsByFloors(min: string, max: string): Promise<Elevator[]> {
        try {
            const elevators = await this.elevatorSchema.find({ elevatorNumberOfFloors: { $gte: min, $lte: max } });

            const elevatorDTOResult = elevators.map(elevator => ElevatorMap.toDomain(elevator));

            return elevatorDTOResult;
        } catch (e) {
            throw e;
        }
    }

    public async deleteAllElevatorsFromFloor(floorId: string): Promise<void> {
        try {
            const query = { floorId: floorId };
            await this.elevatorSchema.deleteMany(query as FilterQuery<IElevatorPersistence & Document>);
        } catch (e) {
            throw e;
        }
    }


}
