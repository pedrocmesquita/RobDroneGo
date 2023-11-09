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
import IBuildingRepo from "./IRepos/IBuildingRepo";

@Service()
export default class ConnectionService implements IConnectionService {
  constructor(
    @Inject(config.repos.connection.name) private connectionRepo : IConnectionRepo,
    @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
    @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
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

      // Check if floorFrom exists and if floorTo exists
      if (floorFrom === null) {
        return Result.fail<IConnectionDTO>("FloorFrom not found");
      }

      if (floorTo === null) {
        return Result.fail<IConnectionDTO>("FloorTo not found");
      }

      // Retrieve buildings
      const buildingFrom = await this.buildingRepo.findByBuildingId(floorFrom.buildingId);
      const buildingTo = await this.buildingRepo.findByBuildingId(floorTo.buildingId);


      const connection = await this.connectionRepo.findByConnectionId(connectionDTO.connectionId);

      if (connection != null) {
        return Result.fail<IConnectionDTO>("Connection already exists.");
      }

      // Verify if floorFrom and floorTo already have a connection
      if (floorFrom.connections.find(existingConnection => existingConnection.connectionId === connectionDTO.connectionId)
      || floorTo.connections.find(existingConnection => existingConnection.connectionId === connectionDTO.connectionId)) {
        return Result.fail<IConnectionDTO>("Connection already exists.");
      }

      const connectionOrError = await Connection.create( connectionDTO );

      if (connectionOrError.isFailure) {
        return Result.fail<IConnectionDTO>(connectionOrError.errorValue());
      }

      const connectionResult = connectionOrError.getValue();

      console.log("1 - ", connectionResult);

      await this.connectionRepo.save(connectionResult);

      // Add connection to floorFrom and floorTo
      floorFrom.addConnection(connectionResult);
      floorTo.addConnection(connectionResult);

      await this.floorRepo.update(floorFrom);
      await this.floorRepo.update(floorTo);

      // Update building
      buildingFrom.addConnectionToFloor(floorFrom.floorId, connectionResult);
      buildingTo.addConnectionToFloor(floorTo.floorId, connectionResult);

      await this.buildingRepo.updateConnections(buildingFrom);
      await this.buildingRepo.updateConnections(buildingTo);

      const connectionDTOResult = ConnectionMap.toDTO( connectionResult ) as IConnectionDTO;
      return Result.ok<IConnectionDTO>( connectionDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateConnection(connectionDTO: IConnectionDTO): Promise<Result<IConnectionDTO>> {
    try {
      const connection = await this.connectionRepo.findByConnectionId(connectionDTO.connectionId);

      if (connection === null) {
        return Result.fail<IConnectionDTO>("Connection not found");
      }

      const connectionOrError = await Connection.create( connectionDTO );

      if (connectionOrError.isFailure) {
        return Result.fail<IConnectionDTO>(connectionOrError.errorValue());
      }

      const connectionResult = connectionOrError.getValue();

      await this.connectionRepo.update(connectionResult);
      await this.floorRepo.deleteAllConnectionsFromFloor(connectionDTO.connectionId);
      await this.buildingRepo.deleteAllConnectionsFromBuilding(connectionDTO.connectionId);

      const newFloorFrom = await this.floorRepo.findByFloorId(connectionResult.floorfromId);
      const newFloorTo = await this.floorRepo.findByFloorId(connectionResult.floortoId);

      newFloorFrom.addConnection(connectionResult);
      newFloorTo.addConnection(connectionResult);

      await this.floorRepo.update(newFloorFrom);
      await this.floorRepo.update(newFloorTo);

      const newBuildingFrom = await this.buildingRepo.findByBuildingId(newFloorFrom.buildingId);
      const newBuildingTo = await this.buildingRepo.findByBuildingId(newFloorTo.buildingId);

      newBuildingFrom.addConnectionToFloor(newFloorFrom.floorId, connectionResult);
      newBuildingTo.addConnectionToFloor(newFloorTo.floorId, connectionResult);

      await this.buildingRepo.updateConnections(newBuildingFrom);
      await this.buildingRepo.updateConnections(newBuildingTo);

      const connectionDTOResult = ConnectionMap.toDTO( connectionResult ) as IConnectionDTO;

      return Result.ok<IConnectionDTO>( connectionDTOResult )
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

  public async deleteAllInstancesOfConnection(connectionId: string): Promise<Result<boolean>> {
    try {
      const connection = await this.connectionRepo.findByConnectionId(connectionId);
      if (connection === null) {
        return Result.fail<boolean>("Connection not found");
      }
      else {
        await this.connectionRepo.deleteAllInstancesOfConnection(connectionId);
        await this.floorRepo.deleteAllConnectionsFromFloor(connectionId);
        await this.buildingRepo.deleteAllConnectionsFromBuilding(connectionId);
        return Result.ok<boolean>(true);
      }
    } catch (e) {
      throw e;
    }
  }
}