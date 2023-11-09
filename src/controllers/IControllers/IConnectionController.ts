import { Request, Response, NextFunction } from "express";

export default interface IConnectionController {
  createConnection(req: Request, res: Response, next: NextFunction);
  updateConnection(req: Request, res: Response, next: NextFunction);
  getConnection(req: Request, res: Response, next: NextFunction);
  getConnections(req: Request, res: Response, next: NextFunction);
  deleteConnection(req: Request, res: Response, next: NextFunction);
  getConnectionsBetween(req: Request, res: Response, next: NextFunction);
    deleteAllInstancesOfConnection(req: Request, res: Response, next: NextFunction);
}