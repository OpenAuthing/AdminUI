import { request } from '@/lib/request';

const ROOT_URL = '/api/admin/usergroups';

const UserGroupService = {
    getAll: async (params: { search?: string; pageIndex?: number; pageSize?: number }) => {
        const { data } = await request(ROOT_URL, {
            method: 'GET',
            params,
        });
        return data;
    },

    get: async (id: string) => {
        const { data } = await await request(`${ROOT_URL}/${id}`);

        return data;
    },
};

export default UserGroupService;
