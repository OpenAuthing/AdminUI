import { request } from '@/lib/request';

const ROOT_URL = '/api/admin/idpTemplates';

const IdentityProviderTemplateService = {
    getAll: async () => {
        const { data } = await request(ROOT_URL);
        return data;
    },

    get: async (providerName: string) => {
        const { data } = await request(`${ROOT_URL}/${providerName}`);
        return data;
    },
};

export default IdentityProviderTemplateService;
