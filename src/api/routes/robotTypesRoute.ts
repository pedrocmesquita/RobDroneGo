import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IRobotTypeController from "../../controllers/IControllers/IRobotTypeController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use("/robotTypes", route);
    
    const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;
    
    route.post("",
        celebrate({
        body: Joi.object({
            typeId: Joi.string().required(),
            brand: Joi.string().required(),
            model: Joi.number().required(),
            taskSystem: Joi.array().required()})
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
        (req, res, next) => ctrl.updateRobotType(req, res, next) );
    
    route.get("/:RobotId",
        celebrate({
        params: Joi.object({
            typeID: Joi.string().required()
        })
        }),
        (req, res, next) => ctrl.getRobotType(req, res, next) );

    };


