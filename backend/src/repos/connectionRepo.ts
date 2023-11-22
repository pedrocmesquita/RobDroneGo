import { Service, Inject } from "typedi";
import { Document, FilterQuery, Model } from "mongoose";
import { IConnectionPersistence } from "../dataschema/IConnectionPersistence";
import IConnectionRepo from "../services/IRepos/IConnectionRepo";
import { Connection } from "../domain/Connection/connection";
import { ConnectionMap } from "../mappers/ConnectionMap";
import { BuildingMap } from "../mappers/BuildingMap";
import { Building } from "../domain/Building/building";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";
import IFloorRepo from "../services/IRepos/IFloorRepo";
import IBuildingRepo from "../services/IRepos/IBuildingRepo";

@Service()
export default class ConnectionRepo implements IConnectionRepo {
  private models: any;

  constructor(
    @Inject("connectionSchema") private connectionSchema: Model<IConnectionPersistence & Document>,
    @Inject("floorSchema") private floorSchema: Model<IFloorPersistence & Document>,
    @Inject("buildingSchema") private buildingSchema: Model<IFloorPersistence & Document>
  ) {}

  private createBaseQuery(): any {
    return {
      where: {}
    };
  }

  public async exists(connection: Connection): Promise<boolean> {
    const idX = connection.connectionId;

    const query = { connectionId: idX };
    const connectionDocument = await this.connectionSchema.findOne(
      query as FilterQuery<IConnectionPersistence & Document>
    );

    return !!connectionDocument === true;
  }

  public async save(connection: Connection): Promise<Connection> {
    const query = { connectionId: connection.connectionId };

    const roleDocument = await this.connectionSchema.findOne(query);

    try{
      if (roleDocument === null) {
        const rawConnection: any = ConnectionMap.toPersistence(connection);
        console.log(rawConnection);

        const connectionCreated = await this.connectionSchema.create(rawConnection);

        return ConnectionMap.toDomain(connectionCreated);
      } else {
        roleDocument.connectionId = connection.connectionId;
        roleDocument.buildingfromId = connection.buildingfromId;
        roleDocument.buildingtoId = connection.buildingtoId;
        roleDocument.floorfromId = connection.floorfromId;
        roleDocument.floortoId = connection.floortoId;
        roleDocument.locationX = connection.locationX
        roleDocument.locationY = connection.locationY
        roleDocument.locationToX = connection.locationToX
        roleDocument.locationToY = connection.locationToY
        await roleDocument.save();

        return connection;
      }
    }
    catch(err){
      throw err;
    }
  }

  public async findByConnectionId(connectionId: string): Promise<Connection> {
    const query = { connectionId: connectionId };
    const connectionRecord = await this.connectionSchema.findOne(
      query as FilterQuery<IConnectionPersistence & Document>
    );

    if (connectionRecord != null) {
      return ConnectionMap.toDomain(connectionRecord);
    }
    return null;
  }

  public async update(connection: Connection): Promise<Connection> {
    await this.connectionSchema.updateOne( { connectionId: connection.connectionId }, ConnectionMap.toDTO(connection));

    const updatedConnection = await this.connectionSchema.findOne({ connectionId: connection.connectionId });

    return ConnectionMap.toDomain(updatedConnection);
  }

  public async findByFloorFromId(floorFromId: string): Promise<Connection[]> {
    const query = { floorfromId: floorFromId };
    const connections = await this.connectionSchema.find(
      query as FilterQuery<IConnectionPersistence & Document>
    );

    if (connections != null) {
      return connections.map(connection => ConnectionMap.toDomain(connection));
    }
    return null;
  }

  public async findByFloorToId(floorToId: string): Promise<Connection[]> {
    const query = { floortoId: floorToId };
    const connections = await this.connectionSchema.find(
      query as FilterQuery<IConnectionPersistence & Document>
    );

    if (connections != null) {
      return connections.map(connection => ConnectionMap.toDomain(connection));
    }
    return null;
  }

  public async updateNewConnectionWithOldConnection(connection: Connection, oldConnectionId: string): Promise<Connection> {
    const query = { connectionId: oldConnectionId };

    const connectionDocument = await this.connectionSchema.findOne(query);

    if (connectionDocument != null) {
      connectionDocument.connectionId = connection.connectionId;
      connectionDocument.buildingfromId = connection.buildingfromId;
      connectionDocument.buildingtoId = connection.buildingtoId;
      connectionDocument.floorfromId = connection.floorfromId;
      connectionDocument.floortoId = connection.floortoId;
      connectionDocument.locationX = connection.locationX
      connectionDocument.locationY = connection.locationY
      connectionDocument.locationToX = connection.locationToX
      connectionDocument.locationToY = connection.locationToY
      await connectionDocument.save();

      return connection;
    }
    else {
      return null;
    }
  }

  public async delete(connectionId: string){
    const query = { connectionId: connectionId };
    await this.connectionSchema.deleteOne(query as FilterQuery<IConnectionPersistence & Document>);
  }

  public async getConnections(): Promise<Connection[]> {
    try {
      const connections = await this.connectionSchema.find();

      const connectionDTOResult = connections.map(connection => ConnectionMap.toDomain(connection));

      return connectionDTOResult;
    } catch (e) {
      throw e;
    }
  }
  public async getConnectionsBetween(buildingidFrom: string, buildingidTo: string): Promise<Connection[]> {
    try {
      const connections = await this.connectionSchema.find({
        $or: [
          { buildingfromId: { $eq: buildingidFrom }, buildingtoId: { $eq: buildingidTo } },
          { buildingfromId: { $eq: buildingidTo }, buildingtoId: { $eq: buildingidFrom } }
        ]
      });
      const connectionDTOResult = connections.map(connection => ConnectionMap.toDomain(connection));

      return connectionDTOResult;
    } catch (e) {
      throw e;
    }
  }

  public async deleteAllInstancesOfConnection(connectionId: string){
    const query = { connectionId: connectionId };
    await this.connectionSchema.deleteMany(query as FilterQuery<IConnectionPersistence & Document>);
  }
}
