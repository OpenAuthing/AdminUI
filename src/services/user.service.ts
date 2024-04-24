import { request } from '@/lib/request';

const ROOT_URL = '/api/admin/users';

const UserService = {
    getAll: async (params: {
        searchKey?: string;
        pageIndex?: number;
        pageSize?: number;
        excludeDepartmentId?: string;
        onlyEnabled?: boolean;
    }) => {
        const { data } = await request(ROOT_URL, {
            method: 'GET',
            params,
        });
        return data;
    },

    get: async (id: string) => {
        const { data } = await request(`${ROOT_URL}/${id}`, {
            method: 'GET',
        });
        return data;
    },

    create: async (input: any) => {
        const { data } = await request(ROOT_URL, {
            method: 'POST',
            data: {
                ...input,
            },
        });

        return data;
    },

    delete: async (id: string) => {
        const { data } = await request(`${ROOT_URL}/${id}`, {
            method: 'DELETE',
        });
        return data === true;
    },

    uploadAvatar: async (id: string, avatarBlob: Blob) => {
        const formData = new FormData();
        formData.append('file', avatarBlob);
        const { data } = await request(`${ROOT_URL}/${id}/avatar`, {
            method: 'put',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return data === true;
    },

    getUserDepartments: async (id: string) => {
        const { data } = await request(`${ROOT_URL}/${id}/departments`, {
            method: 'GET',
        });
        return data;
    },
};

export default UserService;
