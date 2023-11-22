import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRoleController from '../../controllers/IControllers/IRoleController'; 

import config from "../../../config";
import RoleService from "../../services/roleService";
import isAuth from "../middlewares/isAuth";
import attachCurrentUser from "../middlewares/attachCurrentUser";
import roleCheck from "../middlewares/roleCheck";

const route = Router();

export default (app: Router) => {
  app.use('/roles', route);

  const ctrl = Container.get(config.controllers.role.name) as IRoleController;
  const roleService = Container.get(RoleService);
  route.use(isAuth);

  route.use(attachCurrentUser);

  route.use(roleCheck);

  route.post('',
    celebrate({
      body: Joi.object({
        name: Joi.string().required()
      })
    }),
    (req, res, next) => {
      if (req.auth.role != req.adminRole.id) {

        return res.status(403).json({ error: "Unauthorized access" });
      } else {
        // User has the "Gestor de Campus" role, proceed with the controller logic
        try {

          ctrl.createRole(req, res, next);
        } catch (error) {
          next(error);
        }
      }
    } );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required()
      }),
    }),
    (req, res, next) => {
    if (req.auth.role != req.adminRole.id) {

      return res.status(403).json({ error: "Unauthorized access" });
    } else {
      // User has the "Gestor de Campus" role, proceed with the controller logic
      try {

        ctrl.updateRole(req, res, next);
      } catch (error) {
        next(error);
      }
    }} );

  route.get('', async (req, res, next) => {
    try {
      await ctrl.getRoles(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  );
};