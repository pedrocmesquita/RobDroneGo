import { Response, Request, NextFunction } from "express";
import { Container, Inject, Service } from "typedi";
import config from "../../config";
import IConnectionRepo from "../services/IRepos/IConnectionRepo";
import { ConnectionMap } from "../mappers/ConnectionMap";
import IConnectionDTO from "../dto/IConnectionDTO";
import IConnectionController from "./IControllers/IConnectionController";
import IConnectionService from "../services/IServices/IConnectionService";
import { Result } from "../core/logic/Result";

@Service()
export default class ConnectionController implements IConnectionController {
  constructor(@Inject(config.services.connection.name) private connectionServiceInstance : IConnectionService) {}

  public async getConnection(req: Request, res: Response): Promise<Response> {
    try {
      const connection = await this.connectionServiceInstance.getConnection(req.params.id);

      if (connection.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json(connection.getValue());
    } catch (e) {
      throw e;
    }
  }

  public async createConnection(req: Request, res: Response): Promise<Response> {
    try {
      req.body.connectionId = req.body.floorfromId+" TO "+req.body.floortoId;

      const connectionOrError = await this.connectionServiceInstance.createConnection(req.body);

      if (connectionOrError.isFailure) {
        return res.status(404).send();
      }

      return res.status(201).json(connectionOrError.getValue());
    } catch (e) {
      throw e;
    }
  }

  public async updateConnection(req: Request, res: Response): Promise<Response> {
    try {
      const connectionOrError = (await this.connectionServiceInstance.updateConnection(req.body as IConnectionDTO)) as Result<IConnectionDTO>;
      if (connectionOrError.isFailure) {
        return res.status(404).send();
      }
      return res.status(200).json(connectionOrError.getValue());
    } catch (e) {
      throw e;
    }
  }

  public async deleteConnection(req: Request, res: Response, next: NextFunction) {
    try {
      const connection = await this.connectionServiceInstance.deleteConnection(req.params.connectionId as string);

      if (connection.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json(connection.getValue());
    } catch (e) {
      return next(e);
    }
  }

  public async getConnections(req: Request, res: Response): Promise<Response> {
    try {
      const connections = await this.connectionServiceInstance.getConnections();

      if (connections.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json(connections.getValue());
    } catch (e) {
      throw e;
    }
  }
  public async getConnectionsBetween(req: Request, res: Response): Promise<Response> {
    try {
      const connection = await this.connectionServiceInstance.getConnectionsBetween(req.params.buildingidFrom as string, req.params.buildingidTo as string);

      if (connection.isFailure) {
        return res.status(404).send();
      }

      return res.status(200).json(connection.getValue());
    } catch (e) {
      throw e;
    }
  }

    public async deleteAllInstancesOfConnection(req: Request, res: Response, next: NextFunction) {
        try {
        const connection = await this.connectionServiceInstance.deleteAllInstancesOfConnection(req.params.connectionId as string);

        if (connection.isFailure) {
            return res.status(404).send();
        }

        return res.status(200).json(connection.getValue());
        } catch (e) {
        return next(e);
        }
    }
}