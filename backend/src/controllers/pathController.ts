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

      console.log("Inside getPl");
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

      if (path.isFailure) {
        return res.status(404).send();
      }

      // Return the Building and also all the floors
      return res.status(200).json(path.getValue());
    } catch (e) {
      return next(e);
    }
  }

}