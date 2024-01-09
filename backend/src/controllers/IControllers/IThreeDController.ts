import { Request, Response, NextFunction } from "express";

export default interface IThreeDController {
    getJson(req: Request, res: Response, next: NextFunction);
    postJson(req: Request, res: Response, next: NextFunction);
    getJson(req: Request, res: Response, next: NextFunction);

}
