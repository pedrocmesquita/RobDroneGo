import { Building } from "../Building/building";
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { shallowEqual } from "shallow-equal-object";
import { ConnectionId } from "./connectionId";
import { LocationX } from "../Elevator/locationX";
import { LocationY } from "../Elevator/locationY";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import IBuildingDTO from "../../dto/IBuildingDTO";
import { BuildingId } from "../Building/buildingId";
import { BuildingName } from "../Building/buildingName";
import { BuildingDescription } from "../Building/buildingDescription";
import { BuildingNumberOfFloors } from "../Building/buildingNumberOfFloors";
import IConnectionDTO from "../../dto/IConnectionDTO";


interface ConnectionProps {
  connectionId: ConnectionId;
  buildingfromId: string;
  buildingtoId: string;
  floorfromId: string;
  floortoId: string;
  locationX: LocationX;
  locationY: LocationY;
}

export class Connection extends AggregateRoot<ConnectionProps>{

  get id (): UniqueEntityID {
    return this._id;
  }
  get connectionId (): ConnectionId {
    return this.props.connectionId;
  }
  get buildingfromId (): string {
    return this.props.buildingfromId;
  }
  get buildingtoId (): string {
    return this.props.buildingtoId;
  }
  get floorfromId (): string {
    return this.props.floorfromId;
  }
  get floortoId (): string {
    return this.props.floortoId;
  }
  get locationX (): LocationX {
    return this.props.locationX;
  }
  get locationY (): LocationY {
    return this.props.locationY;
  }
  set connectionId (value: ConnectionId) {
    this.props.connectionId = value;
  }
  set buildingfromId (value: string) {
    this.props.buildingfromId = value;
  }
  set buildingtoId (value: string) {
    this.props.buildingtoId = value;
  }
  set floorfromId (value: string) {
    this.props.floorfromId = value;
  }
  set floortoId (value: string) {
    this.props.floortoId = value;
  }
  set locationX (value: LocationX) {
    this.props.locationX = value;
  }
  set locationY (value: LocationY) {
    this.props.locationY = value;
  }

  private constructor(props: ConnectionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (connectionDTO: IConnectionDTO, id?: UniqueEntityID): Result<Connection> {
    const connectionId = connectionDTO.connectionId;
    const buildingfromId = connectionDTO.buildingfromId;
    const buildingtoId = connectionDTO.buildingtoId;
    const floorfromId = connectionDTO.floorfromId;
    const floortoId = connectionDTO.floortoId;
    const locationX = connectionDTO.locationX;
    const locationY = connectionDTO.locationY;

    const connection = new Connection(
      {
        connectionId: ConnectionId.create({connectionId}).getValue(),
        buildingfromId: buildingfromId,
        buildingtoId: buildingtoId,
        floorfromId: floorfromId,
        floortoId: floortoId,
        locationX: LocationX.create({locationX}).getValue(),
        locationY: LocationY.create({locationY}).getValue()
      },
      id
    );
    return Result.ok<Connection>(connection);
  }
}

