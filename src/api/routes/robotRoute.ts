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
    const roleService = Container.get(RoleService);
    route.use(isAuth);

    route.use(attachCurrentUser);

    route.use(roleCheck);

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
        (req, res, next) => {
        if (req.auth.role != req.gestorDeFrotaRole.id && req.auth.role != req.adminRole.id) {

            return res.status(403).json({ error: "Unauthorized access" });
        } else {
            // User has the "Gestor de Campus" role, proceed with the controller logic
            try {

                ctrl.createRobot(req, res, next);
            } catch (error) {
                next(error);
            }
        }} );

    // Get all robots
    route.get("",
        (req, res, next) => {
            if (req.auth.role != req.gestorDeFrotaRole.id && req.auth.role != req.adminRole.id) {

                return res.status(403).json({ error: "Unauthorized access" });
            } else {
                // User has the "Gestor de Campus" role, proceed with the controller logic
                try {

                    ctrl.getRobots(req, res, next);
                } catch (error) {
                    next(error);
                }
            }});

    route.patch("/:idRobot", (req, res, next) => {
        if (req.auth.role != req.gestorDeFrotaRole.id && req.auth.role != req.adminRole.id) {

        return res.status(403).json({ error: "Unauthorized access" });
    } else {
        // User has the "Gestor de Campus" role, proceed with the controller logic
        try {

            ctrl.inibRobot(req, res, next);
        } catch (error) {
            next(error);
        }
    }});
};



