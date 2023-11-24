import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IRobotTypeController from "../../controllers/IControllers/IRobotTypeController";

import config from "../../../config";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import roleCheck from "../middlewares/roleCheck";

const route = Router();

export default (app: Router) => {
    app.use("/robotTypes", route);
    
    const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;
    route.use(isAuth,attachCurrentUser,roleCheck(["Admin","Gestor de Frota"]));

    route.post("",
        celebrate({
        body: Joi.object({
            typeId: Joi.string().required(),
            brand: Joi.string().required(),
            model: Joi.number().required(),
            taskCategory: Joi.string().required(),
        }),
        }),
        (req, res, next) => ctrl.createRobotType(req, res, next) );

    route.put("/:RobotId",
      celebrate({
          body: Joi.object({
              typeID: Joi.string().required(),
              brand: Joi.string().required(),
              model: Joi.number().required(),
              taskSystem: Joi.string().required(),
          }),
      }),
      (req, res, next) => ctrl.updateRobotType(req, res, next) )
    // Get all robot types
    route.get("", (req, res, next) => ctrl.getRobotsTypes(req, res, next) );

    };


