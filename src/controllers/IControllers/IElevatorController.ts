import { Request, Response, NextFunction } from 'express';

export default interface IElevatorController {
    createElevator(req: Request, res: Response, next: NextFunction);
    updateElevator(req: Request, res: Response, next: NextFunction);
    getElevator(req: Request, res: Response, next: NextFunction);
    getElevators(req: Request, res: Response, next: NextFunction);
    deleteElevator(req: Request, res: Response, next: NextFunction);
}