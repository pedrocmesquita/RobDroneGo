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

    route.use(isAuth,attachCurrentUser,roleCheck(["Admin","Gestor de Campus","Estudante","Professor"]));

    route.post("",
        celebrate({
        body: Joi.object({
            floorNumber: Joi.number().required(),
            buildingId: Joi.string().required(),
            floorDescription: Joi.string().required(),
        })
        }),
        (req, res, next) => ctrl.createFloor(req, res, next));
    
    route.put("",
        celebrate({
        body: Joi.object({
            floorId: Joi.string().required(),
            floorNumber: Joi.number().required(),
            floorDescription: Joi.string().required(),
        }),
        }),
        (req, res, next) => ctrl.updateFloor(req, res, next));
    


    route.get("", (req, res, next) => ctrl.getFloors(req, res, next));
    
    route.delete("/:floorId", (req, res, next) => ctrl.deleteFloor(req, res, next));

    // Route that gets all the floors of a building that have connections to other buildings
    route.get("/connections/:buildingId", (req, res, next) => ctrl.getConnections(req, res, next));
    };
