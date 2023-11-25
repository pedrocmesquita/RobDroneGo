import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IRobotController from "../../controllers/IControllers/IRobotController";

import config from "../../../config";
import RoleService from "../../services/roleService";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import roleCheck from "../middlewares/roleCheck";

const route = Router();

export default (app: Router) => {
    app.use("/robots", route);

    const ctrl = Container.get(config.controllers.robot.name) as IRobotController;
    route.use(isAuth,attachCurrentUser,roleCheck(["Admin","Gestor de Frota"]));


    route.post("",
        celebrate({
            body: Joi.object({
                idRobot: Joi.string().required(),
                robotName: Joi.string().required(),
                typeId: Joi.string().required(),
                serialNumber: Joi.string().required(),
                description: Joi.string().required(),
                active: Joi.boolean().required()
        }),
        }),
        (req, res, next) => ctrl.createRobot(req, res, next) );

    // Get all robots
    route.get("",
        (req, res, next) => ctrl.getRobots(req, res, next) );


    route.patch("/:idRobot", (req, res, next) => ctrl.inibRobot(req, res, next) );
};



