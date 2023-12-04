import { Result } from "../core/logic/Result";
import e, { Response, Request, NextFunction } from "express";
import { Container, Inject, Service } from "typedi";
import config from "../../config";
import IPathController from "./IControllers/IPathController";
import IPathService from "../services/IServices/IPathService";


@Service()

export default class PathController implements IPathController {
  constructor(@Inject(config.services.path.name) private pathServiceInstance: IPathService) {
  }

  public async getPl(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("PL CONTROLLER");
      const path = await this.pathServiceInstance.getPl(
        req.params.originB as string,
        req.params.destB as string,
        req.params.originF as string,
        req.params.destF as string,
        req.params.originX as string,
        req.params.originY as string,
        req.params.destX as string,
        req.params.destY as string,
      );

      // Check if path is not an empty string
      if (path) {
        // Return the path
        return res.status(200).json(path);
      } else {
        // If path is an empty string, send a 404 response
        return res.status(404).send();
      }
    } catch (e) {
      return next(e);
    }
  }

  public async createPl(req: Request, res: Response, next: NextFunction) {
    const create = await this.pathServiceInstance.createPl();
  }

}