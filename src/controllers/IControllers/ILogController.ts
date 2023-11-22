import { Request, Response, NextFunction } from "express";

export default interface ILogController {

  getAuth(req: Request, res: Response, next: NextFunction);
  postAuth(req: Request, res: Response, next: NextFunction);
}