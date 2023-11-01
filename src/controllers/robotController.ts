import IRobotController from "./IControllers/IRobotController";
import config from "../../config";
import e, { Response, Request, NextFunction } from "express";
import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import IRobotService from "../services/IServices/IRobotService";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";
import IRobotDTO from "../dto/IRobotDTO";

@Service()
export default class robotController implements IRobotController {
    constructor(@Inject(config.services.robot.name) private RobotServiceInstance: IRobotService) {
    }

    public async createRobot(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body.idRobot);
            const robotOrError = (await this.RobotServiceInstance.createRobot(
                req.params.idRobot as string,
                req.body as IRobotDTO,
            )) as Result<IRobotDTO>;


            if (robotOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(201).json(robotOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async getRobot(req: Request, res: Response, next: NextFunction) {
        try {
            const robot = await this.RobotServiceInstance.getRobot(req.params.id as string);

            if (robot.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(robot.getValue());
        } catch (e) {
            return next(e);
        }
    }

    InibRobot({params: {idRobot}}: e.Request, res: e.Response, next: e.NextFunction) {
    }


}