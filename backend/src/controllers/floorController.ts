import { Response, Request, NextFunction } from "express";
import {Container, Inject, Service} from 'typedi';
import IFloorController from './IControllers/IFloorController';
import IFloorService from '../services/IServices/IFloorService';
import config from '../../config';
import IFloorDTO from '../dto/IFloorDTO';
import {FloorMap} from '../mappers/FloorMap';
import IFloorRepo from '../services/IRepos/IFloorRepo';
import {Floor} from '../domain/Floor/floor';
import { Building } from '../domain/Building/building';
import { Result } from "../core/logic/Result";

@Service()
export default class FloorController implements IFloorController{

    constructor(
        @Inject(config.services.floor.name) private floorServiceInstance: IFloorService
    ) {
    }

    public async getFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const floor = await this.floorServiceInstance.getFloor(req.params.floorId as string);

            if (floor.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(floor.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async createFloor(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.floorId = req.body.buildingId+"-"+req.body.floorNumber;

            const floorOrError = (await this.floorServiceInstance.createFloor(
                req.params.floorId as string,
                req.params.buildingId as string,
                req.body as IFloorDTO,
            )) as Result<IFloorDTO>;

            if (floorOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(201).json(floorOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async updateFloor(req: Request, res: Response, next: NextFunction) {
        try {

            req.body.buildingId = req.body.floorId.split("-")[0];

            const oldFloorId = req.body.floorId;

            // FloorId is the concatenation of buildingId and floorNumber
            req.body.floorId = req.body.buildingId+"-"+req.body.floorNumber;

            const floorOrError = await this.floorServiceInstance.updateFloor(req.body as IFloorDTO, oldFloorId) as Result<IFloorDTO>;

            if (floorOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(floorOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async deleteFloor({params: {floorId}}: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.deleteFloor(floorId as string);

            if (floorOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(floorOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async getFloors(req: Request, res: Response, next:NextFunction) {
        try {
            const floors = await this.floorServiceInstance.getFloors();

            if (floors.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(floors.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async getConnections(req: Request, res: Response, next:NextFunction) {
        try {
            const floors = await this.floorServiceInstance.getConnections(req.params.buildingId as string);

            if (floors.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(floors.getValue());
        } catch (e) {
            return next(e);
        }
    }
}