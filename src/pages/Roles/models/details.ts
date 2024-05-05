import { GetRoleRes } from '@/@types/role';
import { RoleService } from '@/services';
import { useRequest } from 'umi';

export default () => {
    const {
        loading,
        data,
        run: getRoleDetails,
        mutate: setRoleDetails,
    } = useRequest((roleId: string) => RoleService.getRole(roleId), { manual: true });

    const { loading: updating, run: updateRole } = useRequest(RoleService.updateRole, {
        manual: true,
        onSuccess(data, params) {
            if (data) {
                const role = params[1];
                setRoleDetails({
                    ...role,
                });
            }
        },
    });

    const role = (data as GetRoleRes) ?? {};

    return {
        loading,
        role,
        updating,
        getRoleDetails,
        updateRole,
    };
};
