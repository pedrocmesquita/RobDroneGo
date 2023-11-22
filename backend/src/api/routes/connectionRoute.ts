import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IConnectionController from "../../controllers/IControllers/IConnectionController";

import config from "../../../config";
import RoleService from "../../services/roleService";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import roleCheck from "../middlewares/roleCheck";

const route = Router();

export default (app: Router) => {
  app.use("/connections", route);

  const ctrl = Container.get(config.controllers.connection.name) as IConnectionController;
  const roleService = Container.get(RoleService);
  route.use(isAuth);

  route.use(attachCurrentUser);

  route.use(roleCheck);

  route.post("",
    celebrate({
      body: Joi.object({
        buildingfromId: Joi.string().required(),
        buildingtoId: Joi.string().required(),
        floorfromId: Joi.string().required(),
        floortoId: Joi.string().required(),
        locationX: Joi.number().required(),
        locationY: Joi.number().required(),
        locationToX: Joi.number().required(),
        locationToY: Joi.number().required(),
      })
    }),
    (req, res, next) =>{
    if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.createConnection(req, res, next);
      } catch (error) {
        next(error);
      }
    }});

  route.put("",
    celebrate({
      body: Joi.object({
        connectionId: Joi.string().required(),
        locationX: Joi.number().required(),
        locationY: Joi.number().required(),
        locationToX: Joi.number().required(),
        locationToY: Joi.number().required(),
      }),
    }),
    (req, res, next) => {
    if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.updateConnection(req, res, next);
      } catch (error) {
        next(error);
      }
    }});

  route.get("/:connectionId",
    celebrate({
      params: Joi.object({
        connectionId: Joi.string().required()
      })
    }),
    (req, res, next) =>{
    if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.getConnection(req, res, next);
      } catch (error) {
        next(error);
      }
    }});

  route.get("", (req, res, next) =>{
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

  route.delete("/:connectionId", (req, res, next) => {
    if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.deleteAllInstancesOfConnection(req, res, next);
      } catch (error) {
        next(error);
      }
    }
  });
  route.get("/:buildingidFrom/:buildingidTo", (req, res, next) =>{
    if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.getConnectionsBetween(req, res, next);
      } catch (error) {
        next(error);
      }
    }
  });
};
