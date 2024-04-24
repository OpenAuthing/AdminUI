import { request } from '@/lib/request';

const ROOT_URL = '/api/admin/permissionspaces';

const PermissionSpaceService = {
    getAll: (params: any) => {
        return request(ROOT_URL, {
            params,
        });
    },

    getDetail: (id: string) => {
        return request(ROOT_URL + '/' + id);
    },

    create: (req: any) => {
        return request(ROOT_URL, {
            method: 'POST',
            data: req,
        });
    },
};

export default PermissionSpaceService;
