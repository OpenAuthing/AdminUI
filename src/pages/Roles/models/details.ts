import { GetRoleRes } from '@/@types/role';
import { RoleService } from '@/services';
import { useRequest } from 'umi';

export default () => {
    const {
        loading,
        data,
        run: getRoleDetails,
    } = useRequest((roleId: string) => RoleService.getRole(roleId), { manual: true });

    const role = (data as GetRoleRes) ?? {};

    return {
        loading,
        role,
        getRoleDetails,
    };
};
