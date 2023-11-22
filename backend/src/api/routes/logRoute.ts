import { Router } from "express";
import { celebrate, Joi } from "celebrate";

import { Container } from "typedi";
import IRobotController from "../../controllers/IControllers/IRobotController";

import config from "../../../config";
import ILogController from "../../controllers/IControllers/ILogController";
import RoleService from "../../services/roleService";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import roleCheck from "../middlewares/roleCheck";

const route = Router();

export default (app: Router) => {
  app.use("/log", route);

  const ctrl = Container.get(config.controllers.log.name) as ILogController;
  const roleService = Container.get(RoleService);
  route.use(isAuth);

  route.use(attachCurrentUser);

  route.use(roleCheck);

  route.get("/auth", (req, res, next) => {
    if (req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.getAuth(req, res, next);
      } catch (error) {
        next(error);
      }
    }
  }
  );

  route.post("/auth",
    celebrate({
      body: Joi.object({
        email: Joi.string().required()
      }),
    }),
    (req, res, next) => {
      if (req.auth.role != req.adminRole.id) {

        return res.status(403).json({ error: "Unauthorized access" });
      } else {
        // User has the "Gestor de Campus" role, proceed with the controller logic
        try {

          ctrl.postAuth(req, res, next);
        } catch (error) {
          next(error);
        }
      }
    });
}