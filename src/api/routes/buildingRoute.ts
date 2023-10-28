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
            buildingId: Joi.string().required(),
            buildingName: Joi.string().required(),
            buildingNumberOfFloors: Joi.number().required(),
            buildingDescription: Joi.string().required(),
        })
        }),
        (req, res, next) => ctrl.createBuilding(req, res, next) );
    
    route.put("",
        celebrate({
        body: Joi.object({
            buildingId: Joi.string().required(),
            buildingName: Joi.string().required(),
            buildingNumberOfFloors: Joi.number().required(),
            buildingDescription: Joi.string().required(),
        }),
        }),
        (req, res, next) => ctrl.updateBuilding(req, res, next) );
    
    route.get("/:buildingId", (req, res, next) => ctrl.getBuilding(req, res, next) );

    route.get("", (req, res, next) => ctrl.getBuildings(req, res, next) );
    
    route.delete("/:buildingId", (req, res, next) => ctrl.deleteBuilding(req, res, next) );

    // Get buildings that have a number of floors between min and max
    route.get("/floors/:min/:max", (req, res, next) => ctrl.getBuildingsByFloors(req, res, next) );
    };


