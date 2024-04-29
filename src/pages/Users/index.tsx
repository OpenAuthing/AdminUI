import { ListUserModel } from '@/@types/user';
import ContentContainer from '@/components/ContentContainer';
import EmptyState from '@/components/EmptyState';
import PageHeader from '@/components/PageHeader';
import Table, { TableColumn } from '@/components/Table';
import { UserService } from '@/services';
import {
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Button,
    Flex,
    Group,
    LoadingOverlay,
    Menu,
    ScrollArea,
    Text,
    TextInput,
    rem,
} from '@mantine/core';
import { useDebouncedValue, useDisclosure, useInputState } from '@mantine/hooks';
import {
    BanIcon,
    BookUserIcon,
    MailCheckIcon,
    MoreHorizontalIcon,
    ShieldCheckIcon,
    Trash2Icon,
    UserRoundCheckIcon,
    UserRoundPlusIcon,
    UserRoundSearchIcon,
} from 'lucide-react';
import { memo, useState } from 'react';
import { FormattedMessage, Icon, Link, history, useIntl, useRequest } from 'umi';
import CreateUserDialog from './components/CreateUserDialog';

const UserTable = Table<ListUserModel>;

export default function Page() {
    const intl = useIntl();
    const [isEmpty, setEmpty] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useInputState('');
    const [debouncedSearchKey] = useDebouncedValue(searchKey, 200);
    const [opened, { close, open }] = useDisclosure(false);

    const { pagination, loading, data, error, refresh } = useRequest(
        (page) => UserService.getUsers({ ...page, searchKey: debouncedSearchKey }),
        {
            manual: false,
            throttleInterval: 500,
            paginated: true,
            refreshDeps: [debouncedSearchKey],
            formatResult: ({ data }) => ({
                total: data?.totalCount,
                list: data?.items,
            }),
            onSuccess: (data, params) => {
                setEmpty(data.total === 0 && params[0].current === 1 && debouncedSearchKey === '');
            },
        },
    );

    const { total = 0, list = [] } = data ?? {};

    const columns: TableColumn<ListUserModel>[] = [
        {
            dataKey: 'nickname',
            title: intl.formatMessage({ id: 'pages.users.table.columns.name' }),
            render(value: string, data) {
                return (
                    <Group gap="xs">
                        <Avatar size={40} src={data.avatar}>
                            {data.nickname?.substring(0, 1).toUpperCase() ?? 'U'}
                        </Avatar>
                        <Flex direction="column" gap={4}>
                            <Link to={`/admin/users/${data.id}`}>
                                <Text c="primary.5" size="sm" fw={600} truncate>
                                    {value}
                                </Text>
                            </Link>
                            <Text size="xs" c="gray.6" truncate>
                                {data.userName}
                            </Text>
                        </Flex>
                    </Group>
                );
            },
        },
        {
            dataKey: 'emailAddress',
            title: intl.formatMessage({ id: 'pages.users.table.columns.email' }),
        },
        {
            dataKey: 'phoneNumber',
            title: intl.formatMessage({ id: 'pages.users.table.columns.phone' }),
        },
        {
            dataKey: 'enabled',
            title: intl.formatMessage({ id: 'pages.users.table.columns.status' }),
            width: 120,
            render(value) {
                return (
                    <Badge color={value ? 'green.9' : 'red.9'}>
                        <FormattedMessage id={value ? 'common.enabled' : 'common.disabled'} />
                    </Badge>
                );
            },
        },
        {
            dataKey: 'id',
            title: '',
            width: '100px',
            align: 'right',
            render: (id, row) => (
                <Menu width={200} position="bottom-end" shadow="lg">
                    <Menu.Target>
                        <ActionIcon variant="outline" color="gray.6">
                            <MoreHorizontalIcon className="size-5" />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            c="gray.6"
                            onClick={() => history.push(`/admin/users/${id}`)}
                            leftSection={<BookUserIcon className="size-4" />}
                        >
                            <Text size="xs" fw={500}>
                                <FormattedMessage id="pages.users.table.actions.viewdetails" />
                            </Text>
                        </Menu.Item>
                        {!row.isSystemBuiltIn && (
                            <>
                                <Menu.Divider />
                                <Menu.Item
                                    c="gray.6"
                                    leftSection={<ShieldCheckIcon className="size-4" />}
                                >
                                    <Text size="xs" fw={500}>
                                        <FormattedMessage id="pages.users.table.actions.assignrole" />
                                    </Text>
                                </Menu.Item>
                                <Menu.Item
                                    c="gray.6"
                                    leftSection={<UserRoundCheckIcon className="size-4" />}
                                >
                                    <Text size="xs" fw={500}>
                                        <FormattedMessage id="pages.users.table.actions.assigngroup" />
                                    </Text>
                                </Menu.Item>
                                <Menu.Item
                                    c="gray.6"
                                    leftSection={<MailCheckIcon className="size-4" />}
                                >
                                    <Text size="xs" fw={500}>
                                        <FormattedMessage id="pages.users.table.actions.sendverificationemail" />
                                    </Text>
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item c="gray.6" leftSection={<BanIcon className="size-4" />}>
                                    <Text size="xs" fw={500}>
                                        <FormattedMessage id="pages.users.table.actions.disable" />
                                    </Text>
                                </Menu.Item>
                                <Menu.Item
                                    c="red.6"
                                    leftSection={<Trash2Icon className="size-4" />}
                                >
                                    <Text size="xs" fw={500}>
                                        <FormattedMessage id="pages.users.table.actions.delete" />
                                    </Text>
                                </Menu.Item>
                            </>
                        )}
                    </Menu.Dropdown>
                </Menu>
            ),
        },
    ];

    const CreateUserButton = memo(() => (
        <Button onClick={open}>
            <Group gap={rem(4)}>
                <UserRoundPlusIcon className="size-4 stroke-2" />
                <Text size="sm">
                    <FormattedMessage id="pages.users.header.actions.createuser" />
                </Text>
            </Group>
        </Button>
    ));

    return (
        <>
            <ContentContainer>
                <div className="grid grid-cols-1 gap-y-10">
                    <PageHeader>
                        <PageHeader.Content>
                            <PageHeader.Title>
                                <FormattedMessage id="pages.users.header.title" />
                            </PageHeader.Title>
                            <PageHeader.Description>
                                <FormattedMessage id="pages.users.header.description" />
                            </PageHeader.Description>
                        </PageHeader.Content>
                        <PageHeader.Actions>{!isEmpty && <CreateUserButton />}</PageHeader.Actions>
                    </PageHeader>
                    <Box pos="relative">
                        <LoadingOverlay visible={false} />

                        {isEmpty ? (
                            <EmptyState>
                                <EmptyState>
                                    <EmptyState.Icon>
                                        <Icon height="180" width="180" icon="local:empty-1" />
                                    </EmptyState.Icon>
                                    <EmptyState.Subtitle>
                                        <FormattedMessage id="pages.users.empty.subtitle" />
                                    </EmptyState.Subtitle>
                                    <EmptyState.Content>
                                        <EmptyState.Message>
                                            <FormattedMessage id="pages.users.empty.message" />
                                        </EmptyState.Message>
                                        <EmptyState.Actions>
                                            <CreateUserButton />
                                        </EmptyState.Actions>
                                    </EmptyState.Content>
                                </EmptyState>
                            </EmptyState>
                        ) : (
                            <div className="grid grid-cols-1 gap-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-[1_0_auto]">
                                        <TextInput
                                            placeholder={intl.formatMessage({
                                                id: 'pages.users.search.placeholder',
                                            })}
                                            leftSection={<UserRoundSearchIcon className="size-4" />}
                                        />
                                    </div>
                                </div>

                                <div className="max-w-full overflow-hidden">
                                    <ScrollArea>
                                        <UserTable columns={columns} items={list} miw={1000} />
                                    </ScrollArea>
                                </div>

                                {/* <PositionTablePagination
                                    visible={showPagination}
                                    {...pagination}
                                /> */}
                            </div>
                        )}
                    </Box>
                    <div></div>
                </div>
            </ContentContainer>
            <CreateUserDialog opened={opened} onClose={close} />
        </>
    );
}
