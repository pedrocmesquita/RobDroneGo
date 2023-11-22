import { Repo } from "../../core/infra/Repo";
import { Connection } from "../../domain/Connection/connection";
import { ConnectionId } from "../../domain/Connection/connectionId";

export default interface IConnectionRepo extends Repo<Connection> {
  save(connection: Connection): Promise<Connection>;
  findByConnectionId(connectionId: ConnectionId | string): Promise<Connection>;
  update(connection: Connection): Promise<Connection>;
  delete(connectionId: string): void;
  getConnections(): Promise<Connection[]>;
  getConnectionsBetween(buildingidFrom: string, buildingidTo: string): Promise<Connection[]>;
  updateNewConnectionWithOldConnection(connection: Connection, oldConnectionId: string): Promise<Connection>;
  findByFloorFromId(floorFromId: string): Promise<Connection[]>;
  findByFloorToId(floorToId: string): Promise<Connection[]>;
  deleteAllInstancesOfConnection(connectionId: string): void;

  //findByIds (connectionsIds: ConnectionId[]): Promise<Connection[]>;
  //saveCollection (connections: Connection[]): Promise<Connection[]>;
  //removeByConnectionIds (connections: ConnectionId[]): Promise<any>
}