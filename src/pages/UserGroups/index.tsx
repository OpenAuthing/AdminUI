import { ListUserGroupRes } from '@/@types/usergroup';
import ContentContainer from '@/components/ContentContainer';
import EmptyState from '@/components/EmptyState';
import PageHeader from '@/components/PageHeader';
import Table, { TableColumn } from '@/components/Table';
import { UserGroupService } from '@/services';
import {
    Box,
    Button,
    Center,
    Group,
    LoadingOverlay,
    ScrollArea,
    Text,
    TextInput,
    rem,
} from '@mantine/core';
import { useDebouncedValue, useDisclosure, useInputState } from '@mantine/hooks';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { memo, useState } from 'react';
import { Icon, Link, useIntl, useRequest } from 'umi';
import { CreateUserGroupModal } from './components/CreateModal';

const UserGroupTable = Table<ListUserGroupRes>;

export default function Page() {
    const intl = useIntl();
    const [isEmpty, setEmpty] = useState<boolean>(false);
    const [searchKey, setSearchKey] = useInputState('');
    const [debouncedSearchKey] = useDebouncedValue(searchKey, 200);
    const [opened, { close, open }] = useDisclosure(false);

    const { pagination, loading, data, error, refresh } = useRequest(
        (page) => UserGroupService.getGroups({ ...page, searchKey: debouncedSearchKey }),
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
    const { run: createGroup, loading: creating } = useRequest(UserGroupService.createGroup, {
        manual: true,
        async onSuccess() {
            close();

            await refresh();
        },
    });

    const { total = 0, list = [] } = data ?? {};
    const noRecords = total === 0;

    const columns: TableColumn<ListUserGroupRes>[] = [
        {
            dataKey: 'name',
            title: 'Name',
            render(value, data) {
                return (
                    <Link to={`/admin/groups/${data.id}`}>
                        <Text size="sm" c="primary.5" fw={500}>
                            {value}
                        </Text>
                    </Link>
                );
            },
        },
        { dataKey: 'description', title: 'Description' },
        { dataKey: 'id', title: '', width: 80 },
    ];

    const CreateUserGroupButton = memo(() => (
        <Button onClick={open}>
            <Group gap={rem(4)}>
                <PlusIcon className="size-4" />
                Create User Group
            </Group>
        </Button>
    ));

    return (
        <>
            <ContentContainer>
                <div className="grid grid-cols-1 gap-y-10">
                    <PageHeader>
                        <PageHeader.Content>
                            <PageHeader.Title>User Groups</PageHeader.Title>
                            <PageHeader.Description>
                                An easy to use UI to help administrators manage user identities
                                including password resets, creating and provisioning, blocking and
                                deleting users.
                            </PageHeader.Description>
                        </PageHeader.Content>
                        <PageHeader.Actions>
                            {!isEmpty && <CreateUserGroupButton />}
                        </PageHeader.Actions>
                    </PageHeader>

                    <Box pos="relative">
                        <LoadingOverlay visible={loading} />
                        {isEmpty ? (
                            <EmptyState>
                                <EmptyState.Icon>
                                    <Icon height="180" width="180" icon="local:empty-1" />
                                </EmptyState.Icon>
                                <EmptyState.Subtitle>
                                    You don't have any groups yet.
                                </EmptyState.Subtitle>
                                <EmptyState.Content>
                                    <EmptyState.Message>
                                        All of your users will be found here, regardless of the
                                        authentication method they use to access your applications.
                                    </EmptyState.Message>
                                    <EmptyState.Actions>
                                        <CreateUserGroupButton />
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
                                            placeholder={intl.formatMessage({
                                                id: 'pages.usergroups.search.placeholder',
                                            })}
                                            leftSection={<SearchIcon className="size-4" />}
                                        />
                                    </div>
                                </div>

                                <div className="max-w-full overflow-hidden">
                                    <ScrollArea>
                                        <UserGroupTable columns={columns} items={list} />
                                    </ScrollArea>
                                    {noRecords && (
                                        <Center
                                            className="bg-gray-100/80 rounded"
                                            p={rem(16)}
                                            mt={rem(16)}
                                        >
                                            <Text size="sm" c="gray.6">
                                                No user groups found.
                                            </Text>
                                        </Center>
                                    )}
                                </div>
                            </div>
                        )}
                    </Box>
                </div>
            </ContentContainer>
            <CreateUserGroupModal
                opened={opened}
                creating={creating}
                onClose={close}
                onCreate={createGroup}
            />
        </>
    );
}
