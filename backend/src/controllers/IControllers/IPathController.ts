import { Request, Response, NextFunction } from "express";

export default interface IPathController {

  getPl(req: Request, res: Response, next: NextFunction);
  createPl(req: Request, res: Response, next: NextFunction);

}