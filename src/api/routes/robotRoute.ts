import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IRobotController from "../../controllers/IControllers/IRobotController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use("/robots", route);

    const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

    route.post("",
        celebrate({
            body: Joi.object({
                idRobot: Joi.string().required(),
                robotName: Joi.string().required(),
                typeOfRobot: Joi.string().required(),
                serialNumber: Joi.string().required(),
                description: Joi.string().required(),
                active: Joi.boolean().required()
        }),
        }),
        (req, res, next) => ctrl.createRobot(req, res, next) );

    route.get("/:",
        celebrate({
            params: Joi.object({
                typeID: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.getRobot(req, res, next) );


};



