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
import { AggregateRoot } from "../../core/domain/AggregateRoot";


interface ConnectionProps {
  connectionId: string;
  buildingfromId: string;
  buildingtoId: string;
  floorfromId: string;
  floortoId: string;
  locationX: number;
  locationY: number;
  locationToX: number;
  locationToY: number;
}

export class Connection extends AggregateRoot<ConnectionProps>{
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
  get locationX (): number {
    return this.props.locationX;
  }
  get locationY (): number {
    return this.props.locationY;
  }
  get locationToX (): number {
    return this.props.locationToX;
  }
  get locationToY (): number {
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
  set locationX (value: number) {
    this.props.locationX = value;
  }
  set locationY (value: number) {
    this.props.locationY = value;
  }
  set locationToX (value: number) {
    this.props.locationToX = value;
  }
  set locationToY (value: number) {
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
        locationX: locationX,
        locationY: locationY,
        locationToX: locationToX,
        locationToY: locationToY
      },
    );
    return Result.ok<Connection>(connection);
  }
}

