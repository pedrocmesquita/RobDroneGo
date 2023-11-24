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

    route.use(isAuth,attachCurrentUser,roleCheck(["Admin","Gestor de Campus"]));

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
        (req, res, next) => ctrl.createElevator(req, res, next));
    
    route.put("",
        celebrate({
        body: Joi.object({
            elevatorId: Joi.string().required(),
            elevatorNumber: Joi.number().required(),
            //elevatorMap: Joi.string().required(),
            buildingId: Joi.string().required(),
        }),
        }),
        (req, res, next) => ctrl.updateElevator(req, res, next));
    
    route.get("/:elevatorId",
        celebrate({
        params: Joi.object({
            elevatorId: Joi.string().required()
        })
        }),
        (req, res, next) => ctrl.getElevator(req, res, next));

    route.get("", (req, res, next) => ctrl.getElevators(req, res, next));
    
    route.delete("/:elevatorId", (req, res, next) => ctrl.deleteElevator(req, res, next));
    };
