import e, { Response, Request, NextFunction } from "express";
import { Container, Inject, Service } from "typedi";
import config from "../../config";
import IElevatorRepo from "../services/IRepos/IElevatorRepo";
import { ElevatorMap } from "../mappers/ElevatorMap";
import IElevatorDTO from "../dto/IElevatorDTO";
import IElevatorController from "./IControllers/IElevatorController";
import IElevatorService from "../services/IServices/IElevatorService";
import { Result } from "../core/logic/Result";

@Service()
export default class ElevatorController implements IElevatorController {
    constructor(@Inject(config.services.elevator.name) private elevatorServiceInstance : IElevatorService) {}

    public async getElevator(req: Request, res: Response, next: NextFunction){
        try {
            const elevator = await this.elevatorServiceInstance.getElevator(req.params.elevatorId as string);

            if (elevator.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(elevator.getValue());
        }
        catch (e) {
            return next(e);
        }
    }

    public async createElevator(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);
            console.log(req.params.elevatorId);
            console.log("elevador");
            const floorsAttended = req.body.floorsAttended.split(",");
            req.body.floorsAttended = floorsAttended;
            console.log(req.body);
            const elevatorOrError = (await this.elevatorServiceInstance.createElevator(
              req.params.elevatorId as string,
              req.body as IElevatorDTO,
            )) as Result<IElevatorDTO>;


            if (elevatorOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(201).json(elevatorOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async updateElevator(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorOrError = (await this.elevatorServiceInstance.updateElevator(req.body as IElevatorDTO)) as Result<IElevatorDTO>;

            if (elevatorOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(elevatorOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async deleteElevator(req: Request, res: Response, next: NextFunction) {
        try {
            const elevator = await this.elevatorServiceInstance.deleteElevator(req.params.elevatorId as string);

            if (elevator.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(elevator.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async getElevators(req: Request, res: Response, next: NextFunction) {
        try {
            const elevators = await this.elevatorServiceInstance.getElevators();

            if (elevators.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(elevators.getValue());
        } catch (e) {
            return next(e);
        }
    }
}