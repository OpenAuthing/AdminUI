import Content from '@/components/ContentContainer';
import { Loader, Tabs, Text, keys } from '@mantine/core';
import { ArrowLeftIcon } from 'lucide-react';
import {
    Link,
    Navigate,
    Outlet,
    generatePath,
    history,
    useIntl,
    useParams,
    useRequest,
    useSelectedRoutes,
} from 'umi';
import ClientId from './components/ClientId';

const NavTabs = {
    quickstart: {
        label: 'Quickstart',
        path: '/admin/applications/:id/quickstart',
    },
    settings: {
        label: 'Settings',
        path: '/admin/applications/:id/settings',
    },
};

export default () => {
    const params = useParams();
    const id = params.id as string;

    const intl = useIntl();
    const routes = useSelectedRoutes();
    const { route }: any = routes.at(-1);
    const { key } = route!;
    const currentTabKey = key as keyof typeof NavTabs;
    if (currentTabKey === undefined) {
        return <Navigate to="/admin/applications" />;
    }

    const { data, loading } = useRequest(
        () =>
            new Promise<string>((resolve) => {
                setTimeout(() => {
                    resolve('Default client');
                }, 200);
            }),
        {},
    );

    const handleTabChange = (value: string | null) => {
        const tab = NavTabs[value as keyof typeof NavTabs];
        if (tab === undefined) return;
        const path = generatePath(tab.path, { id });

        history.push(path);
    };

    return (
        <Content>
            <Link
                to="/admin/applications"
                className="flex items-center gap-x-1 text-gray-500 text-sm mb-4"
            >
                <ArrowLeftIcon className="size-4" />
                <span>Back to Applications</span>
            </Link>
            <div>
                {loading ? (
                    <div className="w-full h-80 flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-y-10">
                        <div className="flex gap-x-6 items-start">
                            <div className="size-16 rounded bg-gray-200/80"></div>
                            <div className="grid grid-cols-1 justify-between">
                                <Text
                                    component="h1"
                                    size="1.8rem"
                                    fw={500}
                                    lh={1.25}
                                >
                                    Default Client
                                </Text>
                                <div className="flex items-center gap-x-4">
                                    <Text
                                        size="sm"
                                        className="text-gray-500"
                                        fw={500}
                                    >
                                        Single Page Application
                                    </Text>
                                    <ClientId value="1234561234564sadfsdgsdgefefafsd" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-y-6">
                            <Tabs
                                value={currentTabKey}
                                onChange={handleTabChange}
                            >
                                <Tabs.List>
                                    {keys(NavTabs).map((key) => {
                                        const item = NavTabs[key];
                                        return (
                                            <Tabs.Tab
                                                key={key}
                                                value={key}
                                            >
                                                {item.label}
                                            </Tabs.Tab>
                                        );
                                    })}
                                </Tabs.List>
                            </Tabs>
                            <div className="py-4">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Content>
    );
};
