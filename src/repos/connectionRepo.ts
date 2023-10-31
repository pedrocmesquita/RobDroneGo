import { Service, Inject } from "typedi";
import { Document, FilterQuery, Model } from "mongoose";
import { IConnectionPersistence } from "../dataschema/IConnectionPersistence";
import IConnectionRepo from "../services/IRepos/IConnectionRepo";
import { Connection } from "../domain/Connection/connection";
import { ConnectionMap } from "../mappers/ConnectionMap";
import { BuildingMap } from "../mappers/BuildingMap";
import { Building } from "../domain/Building/building";
import { IFloorPersistence } from "../dataschema/IFloorPersistence";

@Service()
export default class ConnectionRepo implements IConnectionRepo {
  private models: any;

  constructor(
    @Inject("connectionSchema") private connectionSchema: Model<IConnectionPersistence & Document>
  ) {}

  private createBaseQuery(): any {
    return {
      where: {}
    };
  }

  public async exists(connection: Connection): Promise<boolean> {
    const idX = connection.id.toValue();

    const query = { connectionId: idX };
    const connectionDocument = await this.connectionSchema.findOne(
      query as FilterQuery<IConnectionPersistence & Document>
    );

    return !!connectionDocument === true;
  }

  public async save(connection: Connection): Promise<Connection> {
    const query = { connectionId: connection.id.toValue() };

    const roleDocument = await this.connectionSchema.findOne(query);

    try{
      if (roleDocument === null) {
        const rawConnection: any = ConnectionMap.toPersistence(connection);

        const connectionCreated = await this.connectionSchema.create(rawConnection);

        return ConnectionMap.toDomain(connectionCreated);
      } else {
        roleDocument.connectionId = connection.connectionId.connectionId;
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
    await this.connectionSchema.updateOne( { connectionId: connection.connectionId.connectionId }, ConnectionMap.toDTO(connection));

    const updatedConnection = await this.connectionSchema.findOne({ connectionId: connection.connectionId.connectionId });

    return ConnectionMap.toDomain(updatedConnection);
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
}
