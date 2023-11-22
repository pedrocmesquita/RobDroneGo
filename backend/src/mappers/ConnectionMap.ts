import { Mapper } from "../core/infra/Mapper";
import { Connection } from "../domain/Connection/connection";
import IConnectionDTO from "../dto/IConnectionDTO";
import { Elevator } from "../domain/Elevator/elevator";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Model } from "mongoose";
import { IElevatorPersistence } from "../dataschema/IElevatorPersistence";
import { IConnectionPersistence } from "../dataschema/IConnectionPersistence";


export class ConnectionMap implements Mapper<Connection> {
  public static toDTO (connection: Connection): any {
    return {
      connectionId: connection.connectionId,
      buildingfromId: connection.buildingfromId,
      buildingtoId: connection.buildingtoId,
      floorfromId: connection.floorfromId,
      floortoId: connection.floortoId,
      locationX: connection.locationX,
      locationY: connection.locationY,
      locationToX: connection.locationToX,
      locationToY: connection.locationToY
    } as IConnectionDTO;
  }

  public static toDomain (connection: any | Model<IConnectionPersistence & Document>): Connection {
    const connectionOrError = Connection.create(connection, new UniqueEntityID(connection.domainId));

    connectionOrError.isFailure ? console.log(connectionOrError.error) : '';

    return connectionOrError.isSuccess ? connectionOrError.getValue() : null;
  }

  public static toPersistence (connection: Connection): any {
    return {
      connectionId: connection.connectionId,
      buildingfromId: connection.buildingfromId,
      buildingtoId: connection.buildingtoId,
      floorfromId: connection.floorfromId,
      floortoId: connection.floortoId,
      locationX: connection.locationX,
      locationY: connection.locationY,
      locationToX: connection.locationToX,
      locationToY: connection.locationToY
    };
  }
}
