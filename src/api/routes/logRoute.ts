import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IRobotController from "../../controllers/IControllers/IRobotController";

import config from "../../../config";
import ILogController from "../../controllers/IControllers/ILogController";

const route = Router();

export default (app: Router) => {
  app.use("/log", route);

  const ctrl = Container.get(config.controllers.log.name) as ILogController;

  route.get("/auth", (req, res, next) => ctrl.getAuth(req, res, next));

  route.post("/auth",
    celebrate({
      body: Joi.object({
        email: Joi.string().required()
      }),
    }),
    (req, res, next) => ctrl.postAuth(req, res, next));
}