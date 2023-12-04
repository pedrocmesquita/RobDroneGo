import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IBuildingController from "../../controllers/IControllers/IBuildingController";
import IThreeDController from "../../controllers/IControllers/IThreeDController";
import IPathController from "../../controllers/IControllers/IPathController";


const router = Router();

export default (app: Router) => {
  app.use("/path", router);

  const ctrl = Container.get(config.controllers.path.name) as IPathController;

  router.get("/:originB/:destB/:originF/:destF/:originX/:originY/:destX/:destY"
    , (req, res, next) => ctrl.getPl(req, res, next));

  router.get("/create", (req, res, next) => ctrl.createPl(req, res, next));


}