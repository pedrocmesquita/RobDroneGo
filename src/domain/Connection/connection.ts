import { Building } from "../Building/building";
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { shallowEqual } from "shallow-equal-object";
import { ConnectionId } from "./connectionId";
import { LocationX } from "../Elevator/locationX";
import { LocationY } from "../Elevator/locationY";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import IConnectionDTO from "../../dto/IConnectionDTO";
import { LocationToY } from "./locationToY";
import { LocationToX } from "./locationToX";


interface ConnectionProps {
  connectionId: string;
  buildingfromId: string;
  buildingtoId: string;
  floorfromId: string;
  floortoId: string;
  locationX: LocationX;
  locationY: LocationY;
  locationToX: LocationToX;
  locationToY: LocationToY;
}

export class Connection extends ValueObject<ConnectionProps>{

  get connectionId (): string {
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
  get locationToX (): LocationToX {
    return this.props.locationToX;
  }
  get locationToY (): LocationToY {
    return this.props.locationToY;
  }
  set connectionId (value: string) {
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
  set locationToX (value: LocationToX) {
    this.props.locationToX = value;
  }
  set locationToY (value: LocationToY) {
    this.props.locationToY = value;
  }

  private constructor(props: ConnectionProps) {
    super(props);
  }

  public static create (connectionDTO: IConnectionDTO, id?: UniqueEntityID): Result<Connection> {
    const connectionId = connectionDTO.connectionId;
    const buildingfromId = connectionDTO.buildingfromId;
    const buildingtoId = connectionDTO.buildingtoId;
    const floorfromId = connectionDTO.floorfromId;
    const floortoId = connectionDTO.floortoId;
    const locationX = connectionDTO.locationX;
    const locationY = connectionDTO.locationY;
    const locationToX = connectionDTO.locationToX;
    const locationToY = connectionDTO.locationToY;

    const connection = new Connection(
      {
        connectionId: connectionId,
        buildingfromId: buildingfromId,
        buildingtoId: buildingtoId,
        floorfromId: floorfromId,
        floortoId: floortoId,
        locationX: LocationX.create({locationX}).getValue(),
        locationY: LocationY.create({locationY}).getValue(),
        locationToX: LocationToX.create({locationToX}).getValue(),
        locationToY: LocationToY.create({locationToY}).getValue(),
      },
    );
    return Result.ok<Connection>(connection);
  }
}

