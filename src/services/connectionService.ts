import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import IConnectionService from './IServices/IConnectionService';
import IConnectionRepo from '../services/IRepos/IConnectionRepo';
import IConnectionDTO from '../dto/IConnectionDTO';
import { ConnectionMap } from "../mappers/ConnectionMap";
import { Connection } from '../domain/Connection/connection';

@Service()
export default class ConnectionService implements IConnectionService {
  constructor(
    @Inject(config.repos.connection.name) private connectionRepo : IConnectionRepo
  ) {}

  public async getConnection(connectionId: string): Promise<Result<IConnectionDTO>> {
    try {
      const connection = await this.connectionRepo.findByConnectionId(connectionId);

      if (connection === null) {
        return Result.fail<IConnectionDTO>("Connection not found");
      }
      else {
        const connectionDTOResult = ConnectionMap.toDTO( connection ) as IConnectionDTO;
        return Result.ok<IConnectionDTO>( connectionDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async createConnection(connectionDTO: IConnectionDTO): Promise<Result<IConnectionDTO>> {
    try {
      const connectionOrError = await Connection.create( connectionDTO );

      if (connectionOrError.isFailure) {
        return Result.fail<IConnectionDTO>(connectionOrError.errorValue());
      }

      const connectionResult = connectionOrError.getValue();

      console.log("1 - ", connectionResult);

      await this.connectionRepo.save(connectionResult);

      const connectionDTOResult = ConnectionMap.toDTO( connectionResult ) as IConnectionDTO;
      return Result.ok<IConnectionDTO>( connectionDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateConnection(connectionId: string, connectionDTO: IConnectionDTO): Promise<Result<IConnectionDTO>> {
    try {
      const connection = await this.connectionRepo.findByConnectionId(connectionId);

      if (connection === null) {
        return Result.fail<IConnectionDTO>("Connection not found");
      }
      else {
        connection.connectionId = connectionDTO.connectionId;
        await this.connectionRepo.save(connection);

        const connectionDTOResult = ConnectionMap.toDTO( connection ) as IConnectionDTO;
        return Result.ok<IConnectionDTO>( connectionDTOResult )
      }
    } catch (e) {
      throw e;
    }
  }

  public async getConnections(): Promise<Result<IConnectionDTO[]>> {
    try {
      const connections = await this.connectionRepo.getConnections();

      const connectionDTOResult = connections.map( connection => ConnectionMap.toDTO( connection ) as IConnectionDTO );

      return Result.ok<IConnectionDTO[]>( connectionDTOResult );
    } catch (e) {
      throw e;
    }
  }

  public async deleteConnection(connectionId: string): Promise<Result<boolean>> {
    try {
      const connection = await this.connectionRepo.findByConnectionId(connectionId);

      if (connection === null) {
        return Result.fail<boolean>("Connection not found");
      }
      else {
        await this.connectionRepo.delete(connection);

        return Result.ok<boolean>(true);
      }
    } catch (e) {
      throw e;
    }
  }
}