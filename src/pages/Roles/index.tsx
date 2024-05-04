import { ListRoleRes } from '@/@types/role';
import ContentContainer from '@/components/ContentContainer';
import EmptyState from '@/components/EmptyState';
import PageHeader from '@/components/PageHeader';
import Table, { TableColumn } from '@/components/Table';
import { RoleService } from '@/services';
import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Center,
    Flex,
    LoadingOverlay,
    Menu,
    ScrollArea,
    Text,
    TextInput,
    rem,
} from '@mantine/core';
import { useDebouncedValue, useDisclosure, useInputState } from '@mantine/hooks';
import { MoreHorizontalIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { FormattedDate, Icon, Link, history, useIntl, useRequest } from 'umi';
import AddSubjectModal from './components/AddSubjectModal';
import CreateRoleModal from './components/CreateModal';

const RoleTable = Table<ListRoleRes>;

export default function Page() {
    const intl = useIntl();
    const [isEmpty, setEmpty] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useInputState('');
    const [debouncedSearchKey] = useDebouncedValue(searchKey, 200);
    const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] =
        useDisclosure(false);
    const [assignModalOpened, { open: openAssignModal, close: closeAssignModal }] =
        useDisclosure(false);

    const { pagination, loading, data, error, refresh } = useRequest(
        (page) => RoleService.getRoles({ ...page, searchKey: debouncedSearchKey }),
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
    const { run: createRole, loading: creating } = useRequest(RoleService.createRole, {
        manual: true,
        onSuccess(data, params) {
            if (data) {
                close();

                history.push(`/admin/roles/${data.id}/settings`);
            }
        },
    });

    const { total = 0, list = [] } = data ?? {};
    const noRecords = total === 0;

    const CreateRoleButton = memo(() => (
        <Button onClick={openCreateModal}>
            <PlusIcon className="size-5 mr-2" />
            Create Role
        </Button>
    ));

    const columns: TableColumn<ListRoleRes>[] = [
        {
            dataKey: 'name',
            title: 'Name',
            width: 300,
            render(value, data) {
                return (
                    <div className="grid grid-cols-[max-content_1fr] items-center gap-x-2 max-w-full">
                        <Link to={`/admin/roles/${data.id}/settings`} className="inline-block">
                            <Text
                                size="sm"
                                c="primary.5"
                                maw={rem(data.isSystemBuiltIn ? 200 : 268)}
                                truncate
                            >
                                {value}
                            </Text>
                        </Link>
                        {data.isSystemBuiltIn && <Badge color="violet.6">System</Badge>}
                    </div>
                );
            },
        },
        { dataKey: 'description', title: 'Description' },
        {
            dataKey: 'enabled',
            title: 'Status',
            width: 110,
            render(value) {
                return (
                    <Badge color={value ? 'green.6' : 'red.6'}>
                        {value ? 'Enabled' : 'Disabled'}
                    </Badge>
                );
            },
        },
        {
            dataKey: 'creationTime',
            title: 'Creation Time',
            width: 190,
            render(value) {
                return (
                    <Flex direction="column">
                        <Text size="sm" c="gray.6">
                            <FormattedDate
                                value={value}
                                year="numeric"
                                month="2-digit"
                                day="2-digit"
                                hour="numeric"
                                minute="numeric"
                                second="numeric"
                                hour12={false}
                            />
                        </Text>
                    </Flex>
                );
            },
        },
        {
            dataKey: 'id',
            title: '',
            width: 80,
            align: 'right',
            render(value) {
                return (
                    <Menu width={160} position="bottom-end" shadow="lg">
                        <Menu.Target>
                            <ActionIcon variant="outline" color="gray.6">
                                <MoreHorizontalIcon className="size-5" />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item c="gray.6">
                                <Link to={`/admin/roles/${value}/settings`}>
                                    <Text size="xs" fw={500}>
                                        View Details
                                    </Text>
                                </Link>
                            </Menu.Item>
                            <Menu.Item c="gray.6" onClick={openAssignModal}>
                                <Text size="xs" fw={500}>
                                    Assign To Subjects
                                </Text>
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item c="red.6" onClick={() => {}}>
                                <Text size="xs" fw={500}>
                                    Delete Role
                                </Text>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                );
            },
        },
    ];

    return (
        <>
            <ContentContainer>
                <div className="grid grid-cols-1 gap-y-10">
                    <PageHeader>
                        <PageHeader.Content>
                            <PageHeader.Title>Roles</PageHeader.Title>
                            <PageHeader.Description>
                                Create and manage Roles for your applications. Roles contain
                                collections of Permissions and can be assigned to Users.
                            </PageHeader.Description>
                        </PageHeader.Content>
                        <PageHeader.Actions>{!isEmpty && <CreateRoleButton />}</PageHeader.Actions>
                    </PageHeader>

                    <Box pos="relative">
                        <LoadingOverlay visible={loading} />

                        {isEmpty ? (
                            <EmptyState>
                                <EmptyState.Icon>
                                    <Icon height="180" width="180" icon="local:empty-2" />
                                </EmptyState.Icon>
                                <EmptyState.Subtitle>
                                    You don't have any roles yet.
                                </EmptyState.Subtitle>
                                <EmptyState.Content>
                                    <EmptyState.Message>
                                        Create roles to represent the types of users that access
                                        your applications. Assign permissions to those roles to
                                        control what users are allowed to do in your apps.
                                    </EmptyState.Message>
                                    <EmptyState.Actions>
                                        <CreateRoleButton />
                                    </EmptyState.Actions>
                                </EmptyState.Content>
                            </EmptyState>
                        ) : (
                            <div className="grid grid-cols-1 gap-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex-[1_0_auto]">
                                        <TextInput
                                            value={searchKey}
                                            onChange={setSearchKey}
                                            placeholder="Search of roles"
                                            leftSection={<SearchIcon className="size-4" />}
                                        />
                                    </div>
                                </div>

                                <div className="max-w-full overflow-hidden">
                                    <ScrollArea>
                                        <RoleTable columns={columns} items={list} miw={rem(1000)} />
                                    </ScrollArea>
                                    {noRecords && (
                                        <Center
                                            className="bg-gray-100/80 rounded"
                                            p={rem(16)}
                                            mt={rem(16)}
                                        >
                                            <Text size="sm" c="gray.6">
                                                No roles found.
                                            </Text>
                                        </Center>
                                    )}
                                </div>

                                {/* <PositionTablePagination
                                visible={showPagination}
                                {...pagination}
                            /> */}
                            </div>
                        )}
                    </Box>
                </div>
            </ContentContainer>
            <CreateRoleModal
                opened={createModalOpened}
                onClose={closeCreateModal}
                onCreate={createRole}
                creating={creating}
            />
            <AddSubjectModal opened={assignModalOpened} onClose={closeAssignModal} />
        </>
    );
}
