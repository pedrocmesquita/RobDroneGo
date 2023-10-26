import {Response, Request} from 'express';
import {Container, Inject, Service} from 'typedi';
import IElevatorController from './IControllers/IElevatorController';
import IElevatorService from '../services/IServices/IElevatorService';
import config from '../../config';
import IElevatorDTO from '../dto/iElevatorDTO';
import {ElevatorMap} from '../mappers/ElevatorMap';
import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import {Elevator} from '../domain/Building/elevator';
import { Building } from '../domain/Building/building';

@Service()
export default class ElevatorController implements IElevatorController{

    constructor(
        @Inject(config.services.elevator.name) private elevatorServiceInstance: IElevatorService
    ) {
    }

    public async getElevator(req: Request, res: Response): Promise<Response> {
        try {
            const elevator = await this.elevatorServiceInstance.getElevator(req.params.id);

            if (elevator.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(elevator.getValue());
        } catch (e) {
            throw e;
        }
    }

    public async createElevator(req: Request, res: Response): Promise<Response> {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.createElevator(req.body);

            if (elevatorOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(201).json(elevatorOrError.getValue());
        } catch (e) {
            throw e;
        }
    }

    public async updateElevator(req: Request, res: Response): Promise<Response> {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.updateElevator(req.params.id, req.body);

            if (elevatorOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(elevatorOrError.getValue());
        } catch (e) {
            throw e;
        }
    }

    public async deleteElevator(req: Request, res: Response): Promise<Response> {
        try {
            const elevatorOrError = await this.elevatorServiceInstance.deleteElevator(req.params.id);

            if (elevatorOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(elevatorOrError.getValue());
        } catch (e) {
            throw e;
        }
    }

    public async getElevators(req: Request, res: Response): Promise<Response> {
        try {
            const elevators = await this.elevatorServiceInstance.getElevators();

            if (elevators.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(elevators.getValue());
        } catch (e) {
            throw e;
        }
    }
}