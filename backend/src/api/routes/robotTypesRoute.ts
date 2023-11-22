import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IRobotTypeController from "../../controllers/IControllers/IRobotTypeController";

import config from "../../../config";
import RoleService from "../../services/roleService";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import roleCheck from "../middlewares/roleCheck";

const route = Router();

export default (app: Router) => {
    app.use("/robotTypes", route);
    
    const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;
    const roleService = Container.get(RoleService);
    route.use(isAuth);

    route.use(attachCurrentUser);

    route.use(roleCheck);

    route.post("",
        celebrate({
        body: Joi.object({
            typeId: Joi.string().required(),
            brand: Joi.string().required(),
            model: Joi.number().required(),
            taskCategory: Joi.string().required(),
        }),
        }),
        (req, res, next) => {

            if (req.auth.role != req.gestorDeFrotaRole.id && req.auth.role != req.adminRole.id) {

                return res.status(403).json({ error: "Unauthorized access" });
            } else {
                // User has the "Gestor de Campus" role, proceed with the controller logic
                try {

                    ctrl.createRobotType(req, res, next);
                } catch (error) {
                    next(error);
                }
            }}
        );

    // Get all robot types
    route.get("", (req, res, next) => {
        if (req.auth.role != req.gestorDeFrotaRole.id && req.auth.role != req.adminRole.id) {

            return res.status(403).json({ error: "Unauthorized access" });
        } else {
            // User has the "Gestor de Campus" role, proceed with the controller logic
            try {

                ctrl.getRobotsTypes(req, res, next);
            } catch (error) {
                next(error);
            }
        }
    } );

    };


