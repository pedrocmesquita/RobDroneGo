import ILogController from "./IControllers/ILogController";
import { NextFunction } from "express";
import config from '../../config';
import { Inject, Service } from "typedi";
import ILogService from "../services/IServices/ILogService";

@Service()
export default class LogController implements ILogController{

    constructor(
      @Inject(config.services.log.name) private LogServiceInstance: ILogService
    ) {
    }

    public async getAuth(req: any, res: any, next: NextFunction) {
        try {
            const auth = await this.LogServiceInstance.getAuth();

            if (auth.length == 0) {
                return res.status(404).send();
            }

            return res.status(200).json(auth);
        } catch (e) {
            return next(e);
        }
    }

public async postAuth(req: any, res: any, next: NextFunction) {
        try {
            const auth = await this.LogServiceInstance.postAuth(req.body.email);

            if (auth == false) {
                return res.status(404).send();
            } else if (auth == true) {

            return res.status(200).json(auth);
            }
        } catch (e) {
            return next(e);
        }
}
}