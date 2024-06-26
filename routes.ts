import { MenuIconType } from '@/@types';

type RouteType = {
    component?: string | undefined;
    layout?: false | undefined;
    path?: string | undefined;
    redirect?: string | undefined;
    routes?: RouteType[];
    wrappers?: Array<string> | undefined;
    showInMenu?: boolean | undefined;
    label?: string;
    icon?: MenuIconType;
    key?: string;
};

const routes: Array<RouteType> = [
    {
        path: '/',
        routes: [
            {
                path: '/admin',
                component: '@/layouts/admin',
                routes: [
                    {
                        path: '/admin',
                        component: 'GettingStarted',
                        showInMenu: true,
                        label: 'routes.menus.gettingstarted',
                        icon: 'Sparkles',
                    },

                    {
                        path: '/admin/dashboard',
                        component: 'Dashboard',
                        showInMenu: true,
                        label: 'routes.menus.dashboard',
                        icon: 'Dashboard',
                    },

                    {
                        path: '/admin/applications',
                        showInMenu: true,
                        label: 'routes.menus.application',
                        icon: 'MonitorSmartphone',
                        routes: [
                            {
                                path: '/admin/applications',
                                component: 'Applications',
                            },
                            {
                                path: '/admin/applications/:id',
                                component: 'Applications/Details',
                                routes: [
                                    {
                                        key: 'quickstart',
                                        path: '/admin/applications/:id/quickstart',
                                        component: 'Applications/Quickstart',
                                    },
                                    {
                                        key: 'settings',
                                        path: '/admin/applications/:id/settings',
                                        component: 'Applications/Settings',
                                    },
                                ],
                            },
                        ],
                    },

                    {
                        label: 'routes.menus.orginizations',
                        icon: 'Network',
                        showInMenu: true,
                        routes: [
                            {
                                path: '/admin/departments',
                                component: 'Departments',
                                showInMenu: true,
                                label: 'routes.menus.departments',
                            },
                            {
                                path: '/admin/positions',
                                component: 'Positions',
                                showInMenu: true,
                                label: 'routes.menus.positions',
                            },
                            {
                                path: '/admin/users',
                                showInMenu: true,
                                label: 'routes.menus.users',
                                routes: [
                                    {
                                        path: '/admin/users',
                                        component: 'Users',
                                    },
                                    {
                                        path: '/admin/users/:id',
                                        component: 'Users/Details',
                                    },
                                ],
                            },
                            {
                                path: '/admin/groups',
                                showInMenu: true,
                                label: 'routes.menus.usergroups',
                                routes: [
                                    { path: '/admin/groups', component: 'UserGroups' },
                                    { path: '/admin/groups/:id', component: 'UserGroups/Details' },
                                ],
                            },
                        ],
                    },

                    {
                        label: 'routes.menus.authentication',
                        icon: 'Fingerprint',
                        showInMenu: true,
                        routes: [],
                    },

                    {
                        label: 'routes.menus.permissions',
                        icon: 'Key',
                        showInMenu: true,
                        routes: [
                            {
                                path: '/admin/roles',
                                showInMenu: true,
                                label: 'routes.menus.roles',
                                routes: [
                                    {
                                        path: '/admin/roles',
                                        component: 'Roles',
                                    },
                                    {
                                        path: '/admin/roles/:id/:tab',
                                        component: 'Roles/Details',
                                    },
                                ],
                            },
                        ],
                    },

                    {
                        path: '/admin/branding',
                        component: 'Branding',
                        showInMenu: true,
                        label: 'routes.menus.branding',
                        icon: 'Palette',
                    },

                    {
                        path: '/admin/settings',
                        showInMenu: true,
                        label: 'routes.menus.settings',
                        icon: 'Settings',
                    },
                ],
            },
            {
                path: '/sign-out',
                component: 'SignOut',
            },
            {
                path: '/post-sign-out',
                component: 'SignOut/Post',
            },
            {
                path: '/',
                redirect: '/admin/dashboard',
            },
        ],
    },
    {
        path: '/*',
        component: '404',
    },
];

export default routes;
