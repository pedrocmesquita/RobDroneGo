import { Router } from "express";
import { Container } from "typedi";
import config from "../../../config";
import IBuildingController from "../../controllers/IControllers/IBuildingController";
import IThreeDController from "../../controllers/IControllers/IThreeDController";


const router = Router();

export default (app: Router) => {
  app.use("/3d", router);

  const ctrlBuilding = Container.get(config.controllers.building.name) as IBuildingController;
  const ctrl3d = Container.get(config.controllers.threeD.name) as IThreeDController;

  router.get("/json", (req, res, next) => ctrl3d.getJson(req, res, next));

  router.get("/buildings", (req, res, next) => ctrlBuilding.getBuildings(req, res, next));

  router.post("/json/:floorId", (req, res, next) => ctrl3d.postJson(req, res, next));

  router.get("/json/:floorId", (req, res, next) => ctrl3d.getJson(req, res, next));
}