import IRobotTypeController from "./IControllers/IRobotTypeController";
import config from "../../config";
import e, { Response, Request, NextFunction } from "express";
import { Inject, Service } from "typedi";
import { Result } from "../core/logic/Result";
import IRobotTypeService from "../services/IServices/IRobotTypeService";
import IRobotTypeDTO from "../dto/IRobotTypeDTO";

@Service()

export default class robotTypeController implements IRobotTypeController {
    constructor(@Inject(config.services.robotType.name) private RobotServiceInstance : IRobotTypeService) {}

    public async createRobotType(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body.typeId);
            console.log(req.body);
            const robotOrError = (await this.RobotServiceInstance.createRobotType(
                req.params.typeId as string,
                req.body as IRobotTypeDTO,
                )) as Result<IRobotTypeDTO>;


            if (robotOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(201).json(robotOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }



    public async updateRobotType(req: Request, res: Response, next: NextFunction) {
        try {
            const RobotOrError = (await this.RobotServiceInstance.updateRobotType(req.body as IRobotTypeDTO)) as Result<IRobotTypeDTO>;

            if (RobotOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(RobotOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }


    public async getRobotType(req: Request, res: Response, next: NextFunction){
        try {
            const robot = await this.RobotServiceInstance.getRobotType(req.params.typeId as string);

            if (robot.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(robot.getValue());
        } catch (e) {
            return next(e);
        }
    };


    public async getRobotsTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const robots = await this.RobotServiceInstance.getRobotsTypes();

            if (robots.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(robots.getValue());
        } catch (e) {
            return next(e);
        }
    }


    
    public async deleteRobotType({params: {typedi}}: Request, res: Response, next: NextFunction) {
        try {
            const buildingOrError = await this.RobotServiceInstance.deleteRobotType(typedi as string);

            if (buildingOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(204).send();
        } catch (e) {
            return next(e);
        }
    }
}