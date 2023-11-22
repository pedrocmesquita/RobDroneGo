import { Result } from "../../core/logic/Result";
import IConnectionDTO from "../../dto/IConnectionDTO";

export default interface IConnectionService {
  createConnection(connectionDTO: IConnectionDTO): Promise<Result<IConnectionDTO>>;
  getConnection(connectionId: string): Promise<Result<IConnectionDTO>>;
  getConnections(): Promise<Result<IConnectionDTO[]>>;
  deleteConnection(connectionId: string): Promise<Result<boolean>>;
  updateConnection(connectionDTO: IConnectionDTO): Promise<Result<IConnectionDTO>>;
  getConnectionsBetween(buildingidFrom: string, buildingidTo: string): Promise<Result<IConnectionDTO[]>>;
    deleteAllInstancesOfConnection(connectionId: string): Promise<Result<boolean>>;
}