import { Response, Request } from "express";
import { Container, Inject, Service } from "typedi";
import config from "../../config";
import IBuildingRepo from "../services/IRepos/IBuildingRepo";
import { BuildingMap } from "../mappers/BuildingMap";
import IBuildingDTO from "../dto/IBuildingDTO";
import IBuildingController from "./IControllers/IBuildingController";
import IBuildingService from "../services/IServices/IBuildingService";

@Service()
export default class BuildingController implements IBuildingController {
    constructor(@Inject(config.services.building.name) private buildingServiceInstance : IBuildingService) {}

    public async getBuilding(req: Request, res: Response): Promise<Response> {
        try {
            const building = await this.buildingServiceInstance.getBuilding(req.params.id);

            if (building.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(building.getValue());
        } catch (e) {
            throw e;
        }
    }

    public async createBuilding(req: Request, res: Response): Promise<Response> {
        try {
            const buildingOrError = await this.buildingServiceInstance.createBuilding(req.body);

            if (buildingOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(201).json(buildingOrError.getValue());
        } catch (e) {
            throw e;
        }
    }

    public async updateBuilding(req: Request, res: Response): Promise<Response> {
        try {
            const buildingOrError = await this.buildingServiceInstance.updateBuilding(req.params.id, req.body);

            if (buildingOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(buildingOrError.getValue());
        } catch (e) {
            throw e;
        }
    }

    public async deleteBuilding(req: Request, res: Response): Promise<Response> {
        try {
            const buildingOrError = await this.buildingServiceInstance.deleteBuilding(req.params.id);

            if (buildingOrError.isFailure) {
                return res.status(404).send();
            }

            return res.status(204).send();
        } catch (e) {
            throw e;
        }
    }

    public async getBuildings(req: Request, res: Response): Promise<Response> {
        try {
            const buildings = await this.buildingServiceInstance.getBuildings();

            if (buildings.isFailure) {
                return res.status(404).send();
            }

            return res.status(200).json(buildings.getValue());
        } catch (e) {
            throw e;
        }
    }
}