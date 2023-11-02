import { Container, Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from "../core/logic/Result";
import IConnectionService from './IServices/IConnectionService';
import IConnectionRepo from '../services/IRepos/IConnectionRepo';
import IConnectionDTO from '../dto/IConnectionDTO';
import { ConnectionMap } from "../mappers/ConnectionMap";
import { Connection } from '../domain/Connection/connection';
import { BuildingMap } from "../mappers/BuildingMap";
import IBuildingDTO from "../dto/IBuildingDTO";
import IFloorRepo from "./IRepos/IFloorRepo";

@Service()
export default class ConnectionService implements IConnectionService {
  constructor(
    @Inject(config.repos.connection.name) private connectionRepo : IConnectionRepo,
    @Inject(config.repos.floor.name) private floorRepo : IFloorRepo
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
      const floorFrom = await this.floorRepo.findByFloorId(connectionDTO.floorfromId);
      const floorTo = await this.floorRepo.findByFloorId(connectionDTO.floortoId);

      if (floorFrom === null) {
        return Result.fail<IConnectionDTO>("Floor not found.");
      }

      const connection = await this.connectionRepo.findByConnectionId(connectionDTO.connectionId);

      if (connection != null) {
        return Result.fail<IConnectionDTO>("Connection already exists.");
      }

      const connectionOrError = await Connection.create( connectionDTO );

      if (connectionOrError.isFailure) {
        return Result.fail<IConnectionDTO>(connectionOrError.errorValue());
      }

      const connectionResult = connectionOrError.getValue();

      console.log("1 - ", connectionResult);

      await this.connectionRepo.save(connectionResult);

      floorFrom.addConnection(connectionResult.connectionId);
      floorTo.addConnection(connectionResult.connectionId);

      await this.floorRepo.save(floorFrom);
      await this.floorRepo.save(floorTo);

      const connectionDTOResult = ConnectionMap.toDTO( connectionResult ) as IConnectionDTO;
      return Result.ok<IConnectionDTO>( connectionDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateConnection(connectionDTO: IConnectionDTO): Promise<Result<IConnectionDTO>> {
    try {
      const exists = await this.connectionRepo.findByConnectionId(connectionDTO.connectionId);

      if (exists === null) {
        return Result.fail<IConnectionDTO>("Connection not found");
      }

      const updatedConnection = await this.connectionRepo.update(ConnectionMap.toDomain(connectionDTO));
      const connectionDTOResult = ConnectionMap.toDTO(updatedConnection) as IConnectionDTO;
      return Result.ok<IConnectionDTO>(connectionDTOResult);
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
        await this.connectionRepo.delete(connectionId);
        return Result.ok<boolean>(true);
      }
    } catch (e) {
      throw e;
    }
  }
  public async getConnectionsBetween(buildingidFrom: string, buildingidTo: string): Promise<Result<IConnectionDTO[]>> {
    try {
      const connections = await this.connectionRepo.getConnectionsBetween(buildingidFrom, buildingidTo);

      const connectionDTOResult = connections.map( connection => ConnectionMap.toDTO( connection ) as IConnectionDTO );

      return Result.ok<IConnectionDTO[]>( connectionDTOResult );
    } catch (e) {
      throw e;
    }
  }
}