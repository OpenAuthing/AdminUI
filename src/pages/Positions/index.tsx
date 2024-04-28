import { Position } from '@/@types/Position';
import ContentContainer from '@/components/ContentContainer';
import EmptyState from '@/components/EmptyState';
import PageHeader from '@/components/PageHeader';
import Table, { TableColumn } from '@/components/Table';
import { PositionService } from '@/services';
import {
    ActionIcon,
    Box,
    Button,
    Group,
    LoadingOverlay,
    Menu,
    Pagination,
    ScrollArea,
    Text,
    TextInput,
    rem,
} from '@mantine/core';
import { useDisclosure, useInputState } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { MoreHorizontalIcon, PencilLineIcon, PlusIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { memo } from 'react';
import { FormattedMessage, Icon, useIntl, useRequest } from 'umi';
import AddPositionModal from './components/AddPositionModal';

const PositionTable = Table<Position>;

type PositionTablePaginationProps = {
    visible?: boolean;
    totalPage: number;
    current: number;
    changeCurrent?: (current: number) => void;
};
const PositionTablePagination = memo<PositionTablePaginationProps>(
    ({ visible = false, totalPage, current, changeCurrent }) => {
        if (visible === false) return null;

        return (
            <div className="pb-6 flex items-center justify-end">
                <Pagination
                    total={totalPage}
                    value={current}
                    onChange={changeCurrent}
                />
            </div>
        );
    },
);

export default function Page() {
    const intl = useIntl();
    const [searchKey, setSearchKey] = useInputState('');
    const [addModalOpened, { close: closeAddModal, open: openAddModal }] = useDisclosure(false);
    const [editModalOpened, { close: closeEditModal, open: openEditModal }] = useDisclosure(false);

    const { pagination, loading, data, error, refresh } = useRequest(
        (page) => PositionService.getPositions(page.current, page.pageSize, searchKey),
        {
            debounceInterval: 500,
            paginated: true,
            refreshDeps: [searchKey],
            formatResult: ({ data }) => ({
                total: data?.totalCount,
                list: data?.items,
            }),
            initialData: {
                total: 0,
                list: [],
            },
        },
    );

    const { run: createPosition, loading: creating } = useRequest(PositionService.createPosition, {
        manual: true,
        onSuccess: async (data, params) => {
            if (data) {
                closeAddModal();

                await refresh();
            }
        },
    });

    const { run: deletePosition, loading: deleting } = useRequest(PositionService.deletePosition, {
        manual: true,
        onSuccess: async (data, params) => {
            if (data) {
                notifications.show({
                    title: 'Position deleted',
                    message: 'Position has been deleted successfully!',
                });

                await refresh();
            }
        },
    });

    const { total = 0, list = [] } = data ?? {};
    const noRecords = total === 0;
    const isEmpty = !loading && searchKey === '' && noRecords;
    const showPagination = total > 10;

    const CreateButton = memo(() => (
        <Button
            type="button"
            onClick={openAddModal}
        >
            <Group gap={rem(4)}>
                <PlusIcon className="size-4 mr-1" />
                <Text size="sm">
                    <FormattedMessage id="pages.positions.header.actions.addposition" />
                </Text>
            </Group>
        </Button>
    ));

    const columns: TableColumn[] = [
        {
            dataKey: 'name',
            title: intl.formatMessage({
                id: 'pages.positions.table.columns.name',
            }),
            width: '260px',
        },
        {
            dataKey: 'description',
            title: intl.formatMessage({
                id: 'pages.positions.table.columns.description',
            }),
        },
        {
            dataKey: 'id',
            title: '',
            width: '100px',
            align: 'right',
            render: (id) => (
                <Menu
                    width={120}
                    position="bottom-end"
                    shadow="lg"
                >
                    <Menu.Target>
                        <ActionIcon
                            variant="subtle"
                            c="gray.6"
                        >
                            <MoreHorizontalIcon className="size-5" />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            leftSection={<PencilLineIcon className="size-4" />}
                            onClick={() => {}}
                        >
                            Edit
                        </Menu.Item>
                        <Menu.Item
                            c="red.5"
                            leftSection={<Trash2Icon className="size-4" />}
                            onClick={() => deletePosition(id)}
                        >
                            Delete
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            ),
        },
    ];

    return (
        <>
            <ContentContainer>
                <div className="grid grid-cols-1 gap-y-10">
                    <PageHeader>
                        <PageHeader.Content>
                            <PageHeader.Title>
                                <FormattedMessage id="pages.positions.header.title" />
                            </PageHeader.Title>
                            <PageHeader.Description>
                                <FormattedMessage id="pages.positions.header.description" />
                            </PageHeader.Description>
                        </PageHeader.Content>
                        <PageHeader.Actions>{!isEmpty && <CreateButton />}</PageHeader.Actions>
                    </PageHeader>

                    <Box pos="relative">
                        <LoadingOverlay visible={loading} />

                        {isEmpty ? (
                            <EmptyState>
                                <EmptyState.Icon>
                                    <Icon
                                        height="180"
                                        width="180"
                                        icon="local:empty-1"
                                    />
                                </EmptyState.Icon>
                                <EmptyState.Subtitle>
                                    <FormattedMessage id="pages.positions.empty.subtitle" />
                                </EmptyState.Subtitle>
                                <EmptyState.Content>
                                    <EmptyState.Message>
                                        <FormattedMessage id="pages.positions.empty.message" />
                                    </EmptyState.Message>
                                    <EmptyState.Actions>
                                        <CreateButton />
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
                                            placeholder="Search of positions"
                                            leftSection={<SearchIcon className="size-4" />}
                                        />
                                    </div>
                                </div>

                                <div className="max-w-full overflow-hidden">
                                    <ScrollArea>
                                        <PositionTable
                                            columns={columns}
                                            items={list}
                                            miw={700}
                                        ></PositionTable>
                                    </ScrollArea>
                                </div>

                                <PositionTablePagination
                                    visible={showPagination}
                                    {...pagination}
                                />
                            </div>
                        )}
                    </Box>
                </div>
            </ContentContainer>
            <AddPositionModal
                loading={creating}
                opened={addModalOpened}
                onClose={closeAddModal}
                onAdd={createPosition}
            />
        </>
    );
}
