import e, { Response, Request, NextFunction } from "express";
import { Container, Inject, Service } from "typedi";
import config from "../../config";
import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import { BuildingMap } from "../mappers/BuildingMap";
import IBuildingDTO from "../dto/IBuildingDTO";
import IBuildingController from "./IControllers/IBuildingController";
import IBuildingService from "../services/IServices/IBuildingService";
import { Result } from "../core/logic/Result";

@Service()
export default class BuildingController implements IBuildingController {
    constructor(@Inject(config.services.building.name) private buildingServiceInstance : IBuildingService) {}

    public async getBuilding(req: Request, res: Response, next: NextFunction){
        try {
            const building = await this.buildingServiceInstance.getBuilding(req.params.id as string);

            if (building.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(building.getValue());
        } catch (e) {
            return next(e);
        }
    };

    public async createBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingOrError = (await this.buildingServiceInstance.createBuilding(
              req.params.buildingId as string,
              req.body as IBuildingDTO,
              )) as Result<IBuildingDTO>;


            if (buildingOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(201).json(buildingOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async updateBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingOrError = (await this.buildingServiceInstance.updateBuilding(req.body as IBuildingDTO)) as Result<IBuildingDTO>;

            if (buildingOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(buildingOrError.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async deleteBuilding({params: {buildingId}}: Request, res: Response, next: NextFunction) {
        try {
            const buildingOrError = await this.buildingServiceInstance.deleteBuilding(buildingId as string);

            if (buildingOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(204).send();
        } catch (e) {
            return next(e);
        }
    }

    public async getBuildings(req: Request, res: Response, next: NextFunction) {
        try {
            const buildings = await this.buildingServiceInstance.getBuildings();

            if (buildings.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(buildings.getValue());
        } catch (e) {
            return next(e);
        }
    }

    public async getBuildingsByFloors(req: Request, res: Response, next: NextFunction) {
        try {
            const buildings = await this.buildingServiceInstance.getBuildingsByFloors(req.params.min as string, req.params.max as string);

            if (buildings.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(buildings.getValue());
        } catch (e) {
            return next(e);
        }
    }
}