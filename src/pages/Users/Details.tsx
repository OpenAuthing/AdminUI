import { UserDetailsModel } from '@/@types/user';
import ContentContainer from '@/components/ContentContainer';
import PageBackButton from '@/components/PageBackButton';
import PageHeader from '@/components/PageHeader';
import { UserService } from '@/services';
import {
    Box,
    Button,
    Flex,
    Group,
    LoadingOverlay,
    Menu,
    Space,
    Tabs,
    Text,
    rem,
} from '@mantine/core';
import {
    BanIcon,
    ChevronDownIcon,
    KeyRoundIcon,
    MailCheckIcon,
    SmartphoneIcon,
    Trash2Icon,
} from 'lucide-react';
import { Suspense, lazy } from 'react';
import { useParams, useRequest } from 'umi';
import UserDetails from './components/UserDetails';

const UserGroups = lazy(() => import('./components/UserGroups'));
const UserRoles = lazy(() => import('./components/UserRoles'));

export default () => {
    const { id } = useParams();
    const { loading, data } = useRequest(() => UserService.getUser(id!));
    const userInfo = (data as UserDetailsModel) ?? {};

    const tabs = [
        { value: 'groups', label: 'Groups', component: UserGroups },
        { value: 'roles', label: 'Roles', component: UserRoles },
    ];

    return (
        <ContentContainer>
            <PageBackButton text="Back to users" backTo="/admin/users" />
            <Space h={rem(16)} />
            <Flex pos="relative" direction="column" rowGap={rem(40)}>
                <LoadingOverlay visible={loading} zIndex={201} />

                <PageHeader>
                    <PageHeader.Avatar src={null}>U</PageHeader.Avatar>
                    <PageHeader.Content>
                        <PageHeader.Title>{userInfo.nickname}</PageHeader.Title>
                        <PageHeader.Description>
                            <Group gap={rem(4)}>
                                <span>user id:</span>
                                <span className="bg-gray-200 text-xs px-1.5 py-0.5 rounded">
                                    {id}
                                </span>
                            </Group>
                        </PageHeader.Description>
                    </PageHeader.Content>
                    <PageHeader.Actions>
                        <Menu width={200} shadow="xl" position="bottom-end">
                            <Menu.Target>
                                <Button px={rem(16)}>
                                    <Group gap={rem(8)}>
                                        <Text fw={500} size="sm">
                                            Actions
                                        </Text>
                                        <ChevronDownIcon className="size-5" />
                                    </Group>
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    c="gray.6"
                                    leftSection={<SmartphoneIcon className="size-4" />}
                                >
                                    <Text size="xs">Send Verfication SMS</Text>
                                </Menu.Item>
                                <Menu.Item
                                    c="gray.6"
                                    leftSection={<MailCheckIcon className="size-4" />}
                                >
                                    <Text size="xs">Send Verfication Email</Text>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item
                                    c="gray.6"
                                    leftSection={<KeyRoundIcon className="size-4" />}
                                >
                                    <Text size="xs" fw={500}>
                                        Reset Password
                                    </Text>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item c="gray.6" leftSection={<BanIcon className="size-4" />}>
                                    <Text size="xs" fw={500}>
                                        Disable
                                    </Text>
                                </Menu.Item>
                                <Menu.Item
                                    c="red.6"
                                    leftSection={<Trash2Icon className="size-4" />}
                                >
                                    <Text size="xs" fw={500}>
                                        Delete
                                    </Text>
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </PageHeader.Actions>
                </PageHeader>

                <Box>
                    <Tabs keepMounted={false} defaultValue="details">
                        <Flex direction="column" gap={rem(24)}>
                            <Tabs.List>
                                <Tabs.Tab value="details">Details</Tabs.Tab>
                                {tabs.map(({ value, label }) => (
                                    <Tabs.Tab key={value} value={value}>
                                        {label}
                                    </Tabs.Tab>
                                ))}
                            </Tabs.List>

                            <Box py={rem(16)}>
                                <Tabs.Panel value="details">
                                    <UserDetails userId={id!} />
                                </Tabs.Panel>
                                <Suspense>
                                    {tabs.map(({ value, component: Component }) => (
                                        <Tabs.Panel key={value} value={value}>
                                            <Component userId={id!} />
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
