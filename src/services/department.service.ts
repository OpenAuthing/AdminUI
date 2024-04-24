import { DepartmentModel } from '@/@types/department';
import { request } from '@/lib/request';

const ROOT_URL = '/api/admin/departments';

const DepartmentService = {
    getChildren: async (parentId?: string) => {
        const { data } = await request(
            `${ROOT_URL}?parentId=${parentId ?? ''}`,
        );

        return data;
    },

    create: async (input: DepartmentModel) => {
        const { data } = await request(ROOT_URL, {
            method: 'POST',
            data: input,
        });

        return data;
    },

    update: async (id: string, input: DepartmentModel) => {
        const { data } = await request(`${ROOT_URL}/${id}`, {
            method: 'PUT',
            data: input,
        });

        return data;
    },

    getDepartmentMembers: async ({
        departmentId,
        pageIndex = 1,
        pageSize = 20,
        onlyDirectUsers,
    }: {
        departmentId?: string | null;
        pageIndex: number | null;
        pageSize: number | null;
        onlyDirectUsers: boolean | null;
    }) => {
        return await request(`${ROOT_URL}/${departmentId}/members`, {
            method: 'GET',
            params: {
                pageIndex,
                pageSize,
                onlyDirectUsers,
            },
        });
    },

    addDepartmentMembers: async ({
        departmentId,
        userIds,
    }: {
        departmentId: string;
        userIds: string[];
    }) => {
        const { data } = await request(`${ROOT_URL}/${departmentId}/members`, {
            method: 'POST',
            data: {
                userIds,
            },
        });
        return data;
    },
    setLeader: async ({
        departmentId,
        userId,
        isLeader,
    }: {
        departmentId: string;
        userId: string;
        isLeader: boolean;
    }) => {
        return await request(
            `${ROOT_URL}/${departmentId}/members/${userId}/leader`,
            {
                method: 'PUT',
                params: {
                    isLeader,
                },
            },
        );
    },
    setMain: async ({
        departmentId,
        userId,
        isMain,
    }: {
        departmentId: string;
        userId: string;
        isMain: boolean;
    }) => {
        return await request(
            `${ROOT_URL}/${departmentId}/members/${userId}/main`,
            {
                method: 'PUT',
                params: {
                    isMain,
                },
            },
        );
    },
};

export default DepartmentService;
