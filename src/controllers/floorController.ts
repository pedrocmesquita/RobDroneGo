import {Response, Request} from 'express';
import {Container, Inject, Service} from 'typedi';
import IFloorController from './IControllers/IFloorController';
import IFloorService from '../services/IServices/IFloorService';
import config from '../../config';
import IFloorDTO from '../dto/IFloorDTO';
import {FloorMap} from '../mappers/FloorMap';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import {Floor} from '../domain/Building/floor';
import { Building } from '../domain/Building/building';

@Service()
export default class FloorController implements IFloorController{

    constructor(
        @Inject(config.services.floor.name) private floorServiceInstance: IFloorService
    ) {
    }

    public async getFloor(req: Request, res: Response): Promise<Response> {
        try {
            const floor = await this.floorServiceInstance.getFloor(req.params.id);

            if (floor.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(floor.getValue());
        } catch (e) {
            throw e;
        }
    }

    public async createFloor(req: Request, res: Response): Promise<Response> {
        try {
            const floorOrError = await this.floorServiceInstance.createFloor(req.body);

            if (floorOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(201).json(floorOrError.getValue());
        } catch (e) {
            throw e;
        }
    }

    public async updateFloor(req: Request, res: Response): Promise<Response> {
        try {
            const floorOrError = await this.floorServiceInstance.updateFloor(req.params.id, req.body);

            if (floorOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(floorOrError.getValue());
        } catch (e) {
            throw e;
        }
    }

    public async deleteFloor(req: Request, res: Response): Promise<Response> {
        try {
            const floorOrError = await this.floorServiceInstance.deleteFloor(req.params.id);

            if (floorOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(floorOrError.getValue());
        } catch (e) {
            throw e;
        }
    }

    public async getFloors(req: Request, res: Response): Promise<Response> {
        try {
            const floors = await this.floorServiceInstance.getFloors();

            if (floors.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(floors.getValue());
        } catch (e) {
            throw e;
        }
    }
}