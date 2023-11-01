import { Request, Response, NextFunction } from "express";

export default interface IRobotController {
    createRobot(req: Request, res: Response, next: NextFunction);
    getRobot(req: Request, res: Response, next: NextFunction);
    InibRobot({params: {idRobot}}: Request, res: Response, next: NextFunction);
}