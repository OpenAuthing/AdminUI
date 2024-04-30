import { defineConfig } from 'umi';

export default defineConfig({
    define: {
        SHOW_OIDC_LOGGING: false,

        ODIC_AUTHORITY: 'http://110.41.18.47:8081',
        ODIC_CLIENT_ID: 'openauthing-admin',
        ODIC_CLIENT_SECRET: '',

        USER_PROFILE_URL: 'http://110.41.18.47:8081/settings/profile',

        ADMIN_API_BASE_URL: 'http://110.41.18.47:8082',
    },
});
