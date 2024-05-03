import __PositionService from './position.service';
import __RoleService from './role.service';
import __UserService from './user.service';

const PositionService = new __PositionService();
const UserService = new __UserService();
const RoleService = new __RoleService();

export { PositionService, RoleService, UserService };
