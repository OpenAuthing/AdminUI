import ContentContainer from '@/components/ContentContainer';
import PageBackButton from '@/components/PageBackButton';
import PageHeader from '@/components/PageHeader';
import withRouteParams from '@/hoc/withRouteParams';
import { Badge, Box, Flex, Group, LoadingOverlay, Space, Tabs, rem } from '@mantine/core';
import React, { Suspense, lazy, useEffect } from 'react';
import { FormattedMessage, Link, Navigate, useModel } from 'umi';

const tabs = [
    {
        key: 'settings',
        label: 'pages.roles.details.settings.tab',
        component: lazy(() => import('./components/Settings')),
    },
    {
        key: 'subjects',
        label: 'pages.roles.details.subjects.tab',
        component: lazy(() => import('./components/Subjects')),
    },
];

interface RoleDetailsPageProps {
    id: string;
    tab: string;
}

const RoleDetailsPage: React.FC<RoleDetailsPageProps> = (props) => {
    const { id, tab } = props;
    const tabKeys = tabs.map((tab) => tab.key);

    if (tabKeys.indexOf(tab) === -1) {
        return <Navigate to="/404" replace />;
    }

    const { loading, role, getRoleDetails } = useModel('Roles.details');
    useEffect(() => {
        getRoleDetails(id);
    }, [id]);

    return (
        <ContentContainer>
            <PageBackButton text="Back to roles" backTo="/admin/roles" />
            <Space h={rem(16)} />
            <Flex pos="relative" direction="column" rowGap={rem(40)}>
                <LoadingOverlay visible={loading} zIndex={201} />

                <PageHeader>
                    <PageHeader.Content>
                        <PageHeader.Title>
                            <Group>
                                {role.name}
                                <Badge color="violet.6">System</Badge>
                            </Group>
                        </PageHeader.Title>
                        <PageHeader.Description>{role.description}</PageHeader.Description>
                    </PageHeader.Content>
                </PageHeader>

                <Box>
                    <Tabs keepMounted={false} defaultValue={tab}>
                        <Flex direction="column" gap={rem(24)}>
                            <Tabs.List>
                                {tabs.map(({ key, label }) => (
                                    <Link key={key} to={`/admin/roles/${id}/${key}`}>
                                        <Tabs.Tab value={key}>
                                            <FormattedMessage id={label} />
                                        </Tabs.Tab>
                                    </Link>
                                ))}
                            </Tabs.List>

                            <Box py={rem(16)}>
                                <Suspense>
                                    {tabs.map(({ key, component: Component }) => (
                                        <Tabs.Panel key={key} value={key}>
                                            <Component roleId={id} />
                                        </Tabs.Panel>
                                    ))}
                                </Suspense>
                            </Box>
                        </Flex>
                    </Tabs>
                </Box>
            </Flex>
        </ContentContainer>
    );
};

export default withRouteParams<RoleDetailsPageProps>(RoleDetailsPage, 'id', 'tab');
