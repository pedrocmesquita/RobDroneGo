import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IRoomController from "../../controllers/IControllers/IRoomController";

import config from "../../../config";
import RoleService from "../../services/roleService";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import roleCheck from "../middlewares/roleCheck";

const route = Router();

export default (app: Router) => {
  app.use("/rooms", route);

  const ctrl = Container.get(config.controllers.room.name) as IRoomController;
  const roleService = Container.get(RoleService);
  route.use(isAuth);

  route.use(attachCurrentUser);

  route.use(roleCheck);

  route.post("",
    celebrate({
      body: Joi.object({
        roomId: Joi.string().required(),
        floorId: Joi.string().required(),
        roomName: Joi.string().required(),
        roomDescription: Joi.string().required(),
        roomCategory: Joi.string().required(),
        doorX: Joi.number().required(),
        doorY: Joi.number().required(),
        originCoordinateX: Joi.number().required(),
        originCoordinateY: Joi.number().required(),
        destinationCoordinateX: Joi.number().required(),
        destinationCoordinateY: Joi.number().required(),
      })
    }),
    (req, res, next) => {
    if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.createRoom(req, res, next);
      } catch (error) {
        next(error);
      }
    }});

  // RoomId cannot be changed
  route.put("",
    celebrate({
      body: Joi.object({
        roomId: Joi.string().required(),
        roomName: Joi.string().required(),
        roomNumberOfFloors: Joi.number().required(),
        roomDescription: Joi.string().required(),
      }),
    }),
    (req, res, next) => {
    if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.updateRoom(req, res, next);
      } catch (error) {
        next(error);
      }
    }});

  route.get("/:roomId", (req, res, next) => {
    if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.updateRoom(req, res, next);
      } catch (error) {
        next(error);
      }
    }});

  route.get("", (req, res, next) => {
    if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.getRooms(req, res, next);
      } catch (error) {
        next(error);
      }
    }
  });

  route.delete("/:roomId", (req, res, next) => {
    if (req.auth.role != req.gestorDeCampusRole.id && req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.deleteRoom(req, res, next);
      } catch (error) {
        next(error);
      }
    }
  });
};
