import { defineConfig } from 'umi';

export default defineConfig({
    define: {
        SHOW_OIDC_LOGGING: false,

        ODIC_AUTHORITY: 'http://localhost:5129',
        ODIC_CLIENT_ID: 'openauthing-admin',
        ODIC_CLIENT_SECRET: '',

        USER_PROFILE_URL: 'http://localhost:5129/#/settings/profile',

        ADMIN_API_BASE_URL: 'https://mock.apifox.com/m1/3236434-2267735-default',
    },
});
