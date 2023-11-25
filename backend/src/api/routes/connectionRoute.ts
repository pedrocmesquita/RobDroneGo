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


  route.use(isAuth,attachCurrentUser,roleCheck(["Admin","Gestor de Campus"]));


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
    (req, res, next) => ctrl.createConnection(req, res, next));

  route.put("",
    celebrate({
      body: Joi.object({
        connectionId: Joi.string().required(),
        buildingfromId: Joi.string().required(),
        buildingtoId: Joi.string().required(),
        floorfromId: Joi.string().required(),
        floortoId: Joi.string().required(),
        locationX: Joi.number().required(),
        locationY: Joi.number().required(),
        locationToX: Joi.number().required(),
        locationToY: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.updateConnection(req, res, next));

  route.get("/:connectionId",
    celebrate({
      params: Joi.object({
        connectionId: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.getConnection(req, res, next));

  route.get("", (req, res, next) => ctrl.getConnections(req, res, next));

  route.delete("/:connectionId", (req, res, next) => ctrl.deleteConnection(req, res, next));
  route.get("/:buildingidFrom/:buildingidTo", (req, res, next) => ctrl.getConnectionsBetween(req, res, next));
};
