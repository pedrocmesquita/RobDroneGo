import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IFloorController from "../../controllers/IControllers/IFloorController";

import config from "../../../config";
import RoleService from "../../services/roleService";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import roleCheck from "../middlewares/roleCheck";

const route = Router();

export default (app: Router) => {
    app.use("/floors", route);
    
    const ctrl = Container.get(config.controllers.floor.name) as IFloorController;
    const roleService = Container.get(RoleService);
    route.use(isAuth);

    route.use(attachCurrentUser);

    route.use(roleCheck);

    route.post("",
        celebrate({
        body: Joi.object({
            floorNumber: Joi.number().required(),
            buildingId: Joi.string().required(),
            floorDescription: Joi.string().required(),
        })
        }),
        (req, res, next) => {
            if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

                return res.status(403).json({ error: "Unauthorized access" });
            } else {
                // User has the "Gestor de Campus" role, proceed with the controller logic
                try {

                    ctrl.createFloor(req, res, next);
                } catch (error) {
                    next(error);
                }
            }
    });
    
    route.put("",
        celebrate({
        body: Joi.object({
            floorId: Joi.string().required(),
            floorNumber: Joi.number().required(),
            floorDescription: Joi.string().required(),
        }),
        }),
        (req, res, next) => {
            if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

                return res.status(403).json({ error: "Unauthorized access" });
            } else {
                // User has the "Gestor de Campus" role, proceed with the controller logic
                try {

                    ctrl.updateFloor(req, res, next);
                } catch (error) {
                    next(error);
                }
            }});
    
    route.get("/:floorId",
        celebrate({
        params: Joi.object({
            floorId: Joi.string().required()
        })
        }),
        (req, res, next) => {
            if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

                return res.status(403).json({ error: "Unauthorized access" });
            } else {
                // User has the "Gestor de Campus" role, proceed with the controller logic
                try {

                    ctrl.getFloor(req, res, next);
                } catch (error) {
                    next(error);
                }
            }
        });

    route.get("", (req, res, next) => {
        if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

            return res.status(403).json({ error: "Unauthorized access" });
        } else {
            // User has the "Gestor de Campus" role, proceed with the controller logic
            try {

                ctrl.getFloors(req, res, next);
            } catch (error) {
                next(error);
            }
        }});
    
    route.delete("/:floorId", (req, res, next) => {
        if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

            return res.status(403).json({ error: "Unauthorized access" });
        } else {
            // User has the "Gestor de Campus" role, proceed with the controller logic
            try {

                ctrl.deleteFloor(req, res, next);
            } catch (error) {
                next(error);
            }
        }});

    // Route that gets all the floors of a building that have connections to other buildings
    route.get("/connections/:buildingId", (req, res, next) => {
        if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

            return res.status(403).json({ error: "Unauthorized access" });
        } else {
            // User has the "Gestor de Campus" role, proceed with the controller logic
            try {

                ctrl.getConnections(req, res, next);
            } catch (error) {
                next(error);
            }
        }});
    };
