import config from "../../config";
import e, { Response, Request, NextFunction } from "express";
import { Container, Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import IThreeDService from "../services/IServices/IThreeDService";
import IThreeDController from "./IControllers/IThreeDController";

@Service()
export default class ThreeDController implements IThreeDController{
    constructor(@Inject(config.services.threeD.name) private threeDServiceInstance: IThreeDService) {}

    public async getJson(req: Request, res: Response, next: NextFunction) {
        try {
            const json = await this.threeDServiceInstance.getJson();

            if (json.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(json.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async postJson(req: Request, res: Response, next: NextFunction) {
        try {
            const json = await this.threeDServiceInstance.postJson(req.params.floorId as string);

            if (json.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(json.getValue());
        } catch (e) {
            return next(e);
        }
    }

}