import { Request, Response, NextFunction } from "express";

export default interface IRobotTypeController {
    createRobotType(req: Request, res: Response, next: NextFunction);
    updateRobotType(req: Request, res: Response, next: NextFunction);
    getRobotType(req: Request, res: Response, next: NextFunction);
    getRobotsTypes(req: Request, res: Response, next: NextFunction);
    deleteRobotType({params: {typedi}}: Request, res: Response, next: NextFunction);
    
    }