import { request } from '@/lib/request';

const ROOT_URL = '/api/admin/idps';

const IdentityProviderService = {
    getAll: async () => {
        const { data } = await request(ROOT_URL);
        return data;
    },
};

export default IdentityProviderService;
