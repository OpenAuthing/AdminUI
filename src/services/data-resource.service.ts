import { request } from '@/lib/request';

const ROOT_URL = '/api/admin/dataresources';

const DataResourceService = {
    query: async (params: { searchKey?: string; pageIndex?: number; pageSize?: number }) => {
        const { data } = await request(ROOT_URL, {
            method: 'GET',
            params,
        });
        return data;
    },
};

export default DataResourceService;
