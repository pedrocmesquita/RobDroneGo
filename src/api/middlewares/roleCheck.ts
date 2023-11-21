import { Container } from "typedi";
import RoleService from "../../services/roleService";

const fetchRoles = async (req, res, next) => {
  try {
    const roleService = Container.get(RoleService);
    const result = await roleService.getRoles();
    const roles = result.getValue();
    req.roles = roles;
    req.adminRole = roles.find((role) => role.name === "Admin");
    req.gestorDeCampusRole = roles.find((role) => role.name === "Gestor de Campus");
    req.gestorDeFrotaRole = roles.find((role) => role.name === "Gestor de Frota");
    next();
  } catch (error) {
    next(error);
  }
};


export default fetchRoles;