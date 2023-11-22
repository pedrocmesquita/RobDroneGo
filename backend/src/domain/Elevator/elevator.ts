import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { ElevatorId } from "./elevatorId";
import { ElevatorDesc } from "./elevatorDesc";
import { ElevatorBrand } from "./elevatorBrand";
import { ElevatorModel } from "./elevatorModel";
import { ElevatorSerNum } from "./elevatorSerNum";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import IElevatorDTO from "../../dto/IElevatorDTO";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { CurrentFloor } from "./currentFloor";
import { LocationX } from "./locationX";
import { LocationY } from "./locationY";
import { Floor } from "../Floor/floor";



interface ElevatorProps {
    elevatorId: ElevatorId;
    floorsAttended: string[];
    elevatorBrand: ElevatorBrand;
    elevatorModel: ElevatorModel;
    elevatorSerNum: ElevatorSerNum;
    elevatorDesc: ElevatorDesc;
    currentFloor: CurrentFloor;
    locationX: LocationX;
    locationY: LocationY;
}

export class Elevator extends AggregateRoot<ElevatorProps> {


    get floorsAttended (): string[] {
        return this.props.floorsAttended;
    }
    get elevatorId (): ElevatorId {
        return this.props.elevatorId;
    }
    get elevatorBrand (): ElevatorBrand {
        return this.props.elevatorBrand;
    }
    get elevatorModel (): ElevatorModel {
        return this.props.elevatorModel;
    }
    get elevatorSerNum (): ElevatorSerNum {
        return this.props.elevatorSerNum;
    }
    get elevatorDesc (): ElevatorDesc {
        return this.props.elevatorDesc;
    }
    get currentFloor (): CurrentFloor {
        return this.props.currentFloor;
    }
    get locationX (): LocationX {
        return this.props.locationX;
    }
    get locationY (): LocationY {
        return this.props.locationY;
    }

    set elevatorId (value: ElevatorId) {
        this.props.elevatorId = value;
    }
    set elevatorBrand (value: ElevatorBrand) {
        this.props.elevatorBrand = value;
    }
    set elevatorModel (value: ElevatorModel) {
        this.props.elevatorModel = value;
    }
    set elevatorSerNum (value: ElevatorSerNum) {
        this.props.elevatorSerNum = value;
    }
    set elevatorDesc (value: ElevatorDesc) {
        this.props.elevatorDesc = value;
    }
    set currentFloor (value: CurrentFloor) {
        this.props.currentFloor = value;
    }
    set locationX (value: LocationX) {
        this.props.locationX = value;
    }
    set locationY (value: LocationY) {
        this.props.locationY = value;
    }


    private constructor(props: ElevatorProps, id?: UniqueEntityID) {
        super(props);
    }

    public static create (elevatorDTO: IElevatorDTO, id?: UniqueEntityID): Result<Elevator> {

        const elevatorId = elevatorDTO.elevatorId;
        const floorsAttended = elevatorDTO.floorsAttended;
        const elevatorBrand = elevatorDTO.elevatorBrand;
        const elevatorModel = elevatorDTO.elevatorModel;
        const elevatorSerNum = elevatorDTO.elevatorSerNum;
        const elevatorDesc = elevatorDTO.elevatorDesc;
        const currentFloor = elevatorDTO.currentFloor;
        const locationX = elevatorDTO.locationX;
        const locationY = elevatorDTO.locationY;

        const elevator = new Elevator(
          {
              elevatorId: ElevatorId.create({elevatorId}).getValue(),
              floorsAttended: floorsAttended,
              elevatorBrand: ElevatorBrand.create({elevatorBrand}).getValue(),
              elevatorModel: ElevatorModel.create({elevatorModel}).getValue(),
              elevatorSerNum: ElevatorSerNum.create({elevatorSerNum}).getValue(),
              elevatorDesc: ElevatorDesc.create({elevatorDesc}).getValue(),
              currentFloor: CurrentFloor.create({currentFloor}).getValue(),
              locationX: LocationX.create({locationX}).getValue(),
              locationY: LocationY.create({locationY}).getValue(),
          }
        );
        return Result.ok<Elevator>(elevator);
    }
}

