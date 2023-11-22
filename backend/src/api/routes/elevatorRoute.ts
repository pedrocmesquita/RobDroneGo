import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IElevatorController from "../../controllers/IControllers/IElevatorController";

import config from "../../../config";
import RoleService from "../../services/roleService";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import roleCheck from "../middlewares/roleCheck";

const route = Router();

export default (app: Router) => {
    app.use("/elevators", route);
    
    const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;
    const roleService = Container.get(RoleService);
    route.use(isAuth);

    route.use(attachCurrentUser);

    route.use(roleCheck);

    route.post("",
        celebrate({
        body: Joi.object({
            elevatorId: Joi.string().required(),
            floorsAttended: Joi.string().required(),
            elevatorBrand: Joi.string().required(),
            elevatorModel: Joi.string().required(),
            elevatorSerNum: Joi.string().required(),
            elevatorDesc: Joi.string().required(),
            currentFloor: Joi.number().required(),
            locationX: Joi.number().required(),
            locationY: Joi.number().required(),
        })
        }),
        (req, res, next) => {
            if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

                return res.status(403).json({ error: "Unauthorized access" });
            } else {
                // User has the "Gestor de Campus" role, proceed with the controller logic
                try {

                    ctrl.createElevator(req, res, next);
                } catch (error) {
                    next(error);
                }
            }
        });
    
    route.put("",
        celebrate({
        body: Joi.object({
            elevatorId: Joi.string().required(),
            elevatorNumber: Joi.number().required(),
            //elevatorMap: Joi.string().required(),
            buildingId: Joi.string().required(),
        }),
        }),
        (req, res, next) =>{
            if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

                return res.status(403).json({ error: "Unauthorized access" });
            } else {
                // User has the "Gestor de Campus" role, proceed with the controller logic
                try {

                    ctrl.updateElevator(req, res, next);
                } catch (error) {
                    next(error);
                }
            }
        });
    
    route.get("/:elevatorId",
        celebrate({
        params: Joi.object({
            elevatorId: Joi.string().required()
        })
        }),
        (req, res, next) => {
            if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

                return res.status(403).json({ error: "Unauthorized access" });
            } else {
                // User has the "Gestor de Campus" role, proceed with the controller logic
                try {

                    ctrl.getElevator(req, res, next);
                } catch (error) {
                    next(error);
                }
            }
        });

    route.get("", (req, res, next) =>{
        if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

            return res.status(403).json({ error: "Unauthorized access" });
        } else {
            // User has the "Gestor de Campus" role, proceed with the controller logic
            try {

                ctrl.getElevators(req, res, next);
            } catch (error) {
                next(error);
            }
        }
    });
    
    route.delete("/:elevatorId", (req, res, next) => {
        if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

            return res.status(403).json({ error: "Unauthorized access" });
        } else {
            // User has the "Gestor de Campus" role, proceed with the controller logic
            try {

                ctrl.deleteElevator(req, res, next);
            } catch (error) {
                next(error);
            }
        }
    });
    };
