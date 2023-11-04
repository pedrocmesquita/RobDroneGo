import IRobotController from "./IControllers/IRobotController";
import config from "../../config";
import e, { Response, Request, NextFunction } from "express";
import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import IRobotService from "../services/IServices/IRobotService";
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

    public async getRobots(req: Request, res: Response, next: NextFunction) {
        try {
            const robots = await this.RobotServiceInstance.getRobots();

            if (robots.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(robots.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async inibRobot ( req: Request, res: Response, next: NextFunction) {

        try {
            console.log(req.body.idRobot);
            const robotOrError = await this.RobotServiceInstance.inibirRobot(
                req.params.idRobot as string,
                ) as Result<IRobotDTO>;

            if (robotOrError.isFailure) {
                return res.status(404).send();
            }
            return res.status(201).json(robotOrError.getValue());
            }catch(e)
            {
                return next(e);
            }
    }
}