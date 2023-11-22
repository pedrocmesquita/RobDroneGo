import { Request, Response, NextFunction } from "express";

export default interface IBuildingController {
    createBuilding(req: Request, res: Response, next: NextFunction);
    updateBuilding(req: Request, res: Response, next: NextFunction);
    getBuilding(req: Request, res: Response, next: NextFunction);
    getBuildings(req: Request, res: Response, next: NextFunction);
    deleteBuilding(req: Request, res: Response, next: NextFunction);
    getBuildingsByFloors(req: Request, res: Response, next: NextFunction);
    updateBuildingDescription(req: Request, res: Response, next: NextFunction);
    updateBuildingName(req: Request, res: Response, next: NextFunction);
    updateBuildingNumberOfFloors(req: Request, res: Response, next: NextFunction);
    }