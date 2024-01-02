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

  route.use(isAuth,attachCurrentUser,roleCheck(["Admin","Gestor de Campus","Estudante","Professor"]));

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
    (req, res, next) => ctrl.createRoom(req, res, next));

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
    (req, res, next) => ctrl.updateRoom(req, res, next));

  route.get("/:roomId", (req, res, next) => ctrl.getRoom(req, res, next));

  route.get("", (req, res, next) => ctrl.getRooms(req, res, next));

  route.delete("/:roomId", (req, res, next) => ctrl.deleteRoom(req, res, next));
};
