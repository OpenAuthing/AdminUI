
type RouteType = {
    component?: (string | undefined);
    layout?: (false | undefined);
    path?: (string | undefined);
    redirect?: (string | undefined);
    routes?: RouteType[];
    wrappers?: (Array<string> | undefined)
    menu?: {
        label: string;
        icon?: string;
    }
}

const routes: Array<RouteType> = [
    {
        path: "/",
        routes: [{
            path: '/admin',
            component: '@/layouts/admin',
            routes: [
                { path: '/admin/dashboard', component: 'dashboard', menu: { label: "Dashboard", icon: "IconChartDots2" } },

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