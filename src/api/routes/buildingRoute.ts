import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IBuildingController from "../../controllers/IControllers/IBuildingController";
import IRoleController from "../../controllers/IControllers/IRoleController";
import config from "../../../config";
import middlewares from "../middlewares";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import RoleService from "../../services/roleService";
import roleCheck from "../middlewares/roleCheck";
import fetchRoles from "../middlewares/roleCheck";

const route = Router();
export default (app: Router) => {
    app.use("/buildings", route);

    const ctrl = Container.get(config.controllers.building.name) as IBuildingController;
    const roleService = Container.get(RoleService);
    route.use(isAuth);

    route.use(attachCurrentUser);

    route.use(roleCheck);

    route.post("",
      celebrate({
        body: Joi.object({
          buildingId: Joi.string().required(),
          buildingName: Joi.string().required(),
          buildingNumberOfFloors: Joi.number().required(),
          buildingDescription: Joi.string().required(),
          dimX: Joi.number().required(),
          dimY: Joi.number().required(),
          wallHeight: Joi.number().required(),
          wallWidth: Joi.number().required(),
        }),
      }),
      (req, res, next) => {
        if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

          return res.status(403).json({ error: "Unauthorized access" });
        } else {
          // User has the "Gestor de Campus" role, proceed with the controller logic
          try {

            ctrl.createBuilding(req, res, next);
          } catch (error) {
            next(error);
          }
        }
    }
      );

    // BuildingId cannot be changed
    route.put("",
      celebrate({
        body: Joi.object({
          buildingId: Joi.string().required(),
          buildingName: Joi.string().required(),
          buildingNumberOfFloors: Joi.number().required(),
          buildingDescription: Joi.string().required(),
          dimX: Joi.number().optional(),
          dimY: Joi.number().optional(),
          wallHeight: Joi.number().optional(),
          wallWidth: Joi.number().optional(),
        }),
      }),
      (req, res, next) => {
        if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

          return res.status(403).json({ error: "Unauthorized access" });
        } else {
          // User has the "Gestor de Campus" role, proceed with the controller logic
          try {

            ctrl.updateBuilding(req, res, next);
          } catch (error) {
            next(error);
          }
        }
    });

    route.get("/:buildingId", (req, res, next) => {
      if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

        return res.status(403).json({ error: "Unauthorized access" });
      } else {
        // User has the "Gestor de Campus" role, proceed with the controller logic
        try {

          ctrl.getBuilding(req, res, next);
        } catch (error) {
          next(error);
        }
      }
    }
    );

    route.get("",  (req, res, next) => {

      if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

        return res.status(403).json({ error: "Unauthorized access" });
      } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.getBuildings(req, res, next);
      } catch (error) {
        next(error);
      }
    }
    }
    );


    route.delete("/:buildingId", (req, res, next) => {
      if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.deleteBuilding(req, res, next);
      } catch (error) {
        next(error);
      }
    }});

    route.get("/floors/:min/:max", (req, res, next) => {
      if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.getBuildingsByFloors(req, res, next);
      } catch (error) {
        next(error);
      }
    }});

    // Patch is used to update a single field, in this case the building description
    route.patch("/changeDescription/:buildingId", celebrate({
        body: Joi.object({
          buildingDescription: Joi.string().required(),
        }),
      }),
      (req, res, next) => {if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

        return res.status(403).json({ error: "Unauthorized access" });
      } else {
        // User has the "Gestor de Campus" role, proceed with the controller logic
        try {

          ctrl.updateBuildingDescription(req, res, next);
        } catch (error) {
          next(error);
        }
      }});

    // Patch to update the buildingName
    route.patch("/changeName/:buildingId", celebrate({
        body: Joi.object({
          buildingName: Joi.string().required(),
        }),
      }),
      (req, res, next) => {
      if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

        return res.status(403).json({ error: "Unauthorized access" });
      } else {
        // User has the "Gestor de Campus" role, proceed with the controller logic
        try {

          ctrl.updateBuildingName(req, res, next);
        } catch (error) {
          next(error);
        }
      }});

    // Patch to update the buildingNumberOfFloors
    route.patch("/changeNumberOfFloors/:buildingId", celebrate({
        body: Joi.object({
          buildingNumberOfFloors: Joi.number().required(),
        }),
      }),
      (req, res, next) => {
      if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

        return res.status(403).json({ error: "Unauthorized access" });
      } else {
        // User has the "Gestor de Campus" role, proceed with the controller logic
        try {

          ctrl.updateBuildingNumberOfFloors(req, res, next);
        } catch (error) {
          next(error);
        }
      }});
};


