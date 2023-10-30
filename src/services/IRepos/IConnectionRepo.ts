import { Repo } from "../../core/infra/Repo";
import { Connection } from "../../domain/Connection/connection";

export default interface IConnectionRepo extends Repo<Connection> {
  save(connection: Connection): Promise<Connection>;
  findByConnectionId (connectionId: string): Promise<Connection>;
  update(connection: Connection): Promise<Connection>;
  delete(connection: Connection): Promise<Connection>;
  getConnections(): Promise<Connection[]>;

  //findByIds (connectionsIds: ConnectionId[]): Promise<Connection[]>;
  //saveCollection (connections: Connection[]): Promise<Connection[]>;
  //removeByConnectionIds (connections: ConnectionId[]): Promise<any>
}