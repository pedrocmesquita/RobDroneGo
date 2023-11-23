import { Container } from "typedi";
import RoleService from "../../services/roleService";

function roleCheck(rolesAllowed: string[]) {
  const fetchRoles = async (req, res, next) => {
    try {
      const roleService = Container.get(RoleService);
      const result = await roleService.getRoles();
      const roles = result.getValue();
      req.roles = roles;
      //req.adminRole = roles.find((role) => role.name === "Admin");
      //req.gestorDeCampusRole = roles.find((role) => role.name === "Gestor de Campus");
      //req.gestorDeFrotaRole = roles.find((role) => role.name === "Gestor de Frota");
      //req.gestorDeTarefasRole = roles.find((role) => role.name === "Gestor de Tarefas");
      req.auth.roleOfUser = roles.find((role) => role.id === req.auth.role);

      if (rolesAllowed.includes(req.auth.roleOfUser.name)) {
        return next();
      } else {
        return res.status(403).json({ error: "Unauthorized access" });
      }
    } catch (error) {
      next(error);
    }
  }
  return fetchRoles;
}
export default roleCheck;