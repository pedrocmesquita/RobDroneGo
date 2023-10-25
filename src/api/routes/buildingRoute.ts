import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IBuildingController from "../../controllers/IControllers/IBuildingController";

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use("/buildings", route);
    
    const ctrl = Container.get(config.controllers.building.name) as IBuildingController;
    
    route.post("",
        celebrate({
        body: Joi.object({
            buildingId: Joi.string().required()
        })
        }),
        (req, res, next) => ctrl.createBuilding(req, res, next) );
    
    route.put("",
        celebrate({
        body: Joi.object({
            id: Joi.string().required(),
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            zip: Joi.string().required(),
            campusId: Joi.string().required()
        }),
        }),
        (req, res, next) => ctrl.updateBuilding(req, res, next) );
    
    route.get("/:id",
        celebrate({
        params: Joi.object({
            id: Joi.string().required()
        })
        }),
        (req, res, next) => ctrl.getBuilding(req, res, next) );

    route.get("", (req, res, next) => ctrl.getBuildings(req, res, next) );
    
    route.delete("/:id", (req, res, next) => ctrl.deleteBuilding(req, res, next) );
    };
