import { MenuIconType } from '@/types'

type RouteType = {
    component?: (string | undefined);
    layout?: (false | undefined);
    path?: (string | undefined);
    redirect?: (string | undefined);
    routes?: RouteType[];
    wrappers?: (Array<string> | undefined);
    showInMenu?: (boolean | undefined);
    label?: string;
    icon?: MenuIconType;
}

const routes: Array<RouteType> = [
    {
        path: "/",
        routes: [{
            path: '/admin',
            component: '@/layouts/admin',
            routes: [
                { path: '/admin/dashboard', component: 'Dashboard', showInMenu: true, label: "menus.dashboard", icon: "Dashboard" },

                { path: '/admin/applications', component: 'Applications', showInMenu: true, label: "menus.application", icon: "MonitorSmartphone" },

                {
                    label: "menus.orginizations", icon: "Network", showInMenu: true,
                    routes: [
                        { path: '/admin/departments', component: 'Departments', showInMenu: true, label: "menus.departments" },
                        { path: '/admin/users', component: 'Users', showInMenu: true, label: "menus.users" },
                        { path: '/admin/user-groups', component: 'UserGroups', showInMenu: true, label: "menus.usergroups" },
                    ]
                },

                {
                    label: "menus.authentication", icon: "Fingerprint", showInMenu: true,
                    routes: [
                    ]
                },

                {
                    label: "menus.permissions", icon: "Key", showInMenu: true,
                    routes: [
                        { path: '/admin/roles', component: 'Roles', showInMenu: true, label: "menus.roles" },
                    ]
                },

                { path: '/admin/branding', component: "Branding", showInMenu: true, label: "menus.branding", icon: "Palette" },

                { path: '/admin/settings', showInMenu: true, label: "menus.settings", icon: "Settings" },

                { path: '/admin', redirect: '/admin/dashboard' }
            ]
        }, {
            path: '/',
            redirect: '/admin/dashboard'
        }]
    }, {
        path: '/*',
        component: '404'
    }
]


export default routes