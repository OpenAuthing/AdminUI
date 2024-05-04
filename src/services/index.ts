import __PositionService from './position.service';
import __RoleService from './role.service';
import __UserGroupService from './user-group.service';
import __UserService from './user.service';

const PositionService = new __PositionService();
const UserService = new __UserService();
const RoleService = new __RoleService();
const UserGroupService = new __UserGroupService();

export { PositionService, RoleService, UserGroupService, UserService };
