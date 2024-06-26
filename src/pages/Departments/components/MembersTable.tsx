import EmptyState from '@/components/EmptyState';
import DepartmentService from '@/services/department.service';
import {
    ActionIcon,
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Group,
    LoadingOverlay,
    Pagination,
    ScrollArea,
    Table,
    TableThProps,
    Text,
    UnstyledButton,
    rem,
} from '@mantine/core';
import cx from 'clsx';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronsDownUpIcon,
    MoreHorizontalIcon,
    PlusIcon,
} from 'lucide-react';
import React, { memo, useEffect, useState } from 'react';
import { FormattedMessage, Icon, useRequest } from 'umi';

interface ThProps extends TableThProps {
    sortable?: boolean;
    reversed?: boolean;
    sorted?: boolean;
    onSort?(): void;
}

function Th({ sortable, children, reversed, sorted, onSort, ...others }: ThProps) {
    const Icon = sortable
        ? sorted
            ? reversed
                ? ChevronUpIcon
                : ChevronDownIcon
            : ChevronsDownUpIcon
        : undefined;
    return (
        <Table.Th {...others}>
            <UnstyledButton onClick={onSort}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    {Icon && (
                        <Center>
                            <Icon className="size-4" />
                        </Center>
                    )}
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}

interface MembersTableProps {
    departmentName: string;
    departmentId: string;
}

const MembersTable: React.FC<MembersTableProps> = ({ departmentName, departmentId, ...others }) => {
    const [scrolled, setScrolled] = useState(false);

    const {
        loading,
        data,
        run: getMembers,
    } = useRequest(DepartmentService.getDepartmentMembers, {
        manual: true,
        initialData: { totalCount: 0, items: [] },
    });

    const { totalCount, items = [] } = data ?? {};
    const isEmpty = (items?.length ?? 0) === 0;

    useEffect(() => {
        getMembers({
            departmentId,
            pageIndex: 1,
            pageSize: 10,
            onlyDirectUsers: false,
        });
    }, [departmentId]);

    const AddMemberButton = memo(() => {
        return (
            <Button variant="link">
                <Group gap={rem(4)}>
                    <PlusIcon className="w-4 h-4" />
                    <Text size="sm">
                        <FormattedMessage id="pages.departments.members.add" />
                    </Text>
                </Group>
            </Button>
        );
    });

    if (isEmpty) {
        return (
            <Box pos="relative">
                <LoadingOverlay visible={loading} />
                <EmptyState className="border-none">
                    <EmptyState.Icon>
                        <Icon icon="local:empty-3" width="180" height="180" />
                    </EmptyState.Icon>
                    <EmptyState.Subtitle>{departmentName}</EmptyState.Subtitle>
                    <EmptyState.Content>
                        <EmptyState.Message>No members under this department.</EmptyState.Message>
                        <EmptyState.Actions>
                            <AddMemberButton />
                        </EmptyState.Actions>
                    </EmptyState.Content>
                </EmptyState>
            </Box>
        );
    }

    return (
        <div className="grid grid-rows-[max-content_1fr_max-content] h-full relative gap-4 overflow-hidden">
            <LoadingOverlay visible={loading} />
            <div className="flex items-center justify-between text-sm">
                <div className="flex-1 flex gap-x-4">
                    <span className="font-semibold">{departmentName}</span>
                </div>
                <div>
                    <AddMemberButton />
                </div>
            </div>
            <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table horizontalSpacing="md" verticalSpacing="md" miw={1000} layout="fixed">
                    <Table.Thead
                        className={cx(
                            'sticky top-0 bg-[var(--mantine-color-body)] transition-[box-shadow]',
                            {
                                ['shadow-md']: scrolled,
                            },
                        )}
                    >
                        <Table.Tr>
                            <Th>User</Th>
                            <Th w={rem(220)}>Email</Th>
                            <Th w={rem(160)}>Phone</Th>
                            <Th w={rem(280)}>Departments</Th>
                            <Th w={rem(100)}></Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {items?.map((row: any) => (
                            <Table.Tr key={row.id}>
                                <Table.Td>
                                    <Group gap="xs">
                                        <Avatar size="md" src={row.avatar}>
                                            {row.nickname?.substring(0, 1)}
                                        </Avatar>
                                        <Flex direction="column">
                                            <Text size="sm" truncate>
                                                {row.nickname}
                                            </Text>
                                            <Text size="xs" c="gray.6" truncate>
                                                {row.userName}
                                            </Text>
                                        </Flex>
                                    </Group>
                                </Table.Td>
                                <Table.Td>
                                    <Text size="sm" truncate>
                                        {row.emailAddress}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    <Text size="sm" truncate>
                                        {row.phoneNumber}
                                    </Text>
                                </Table.Td>
                                <Table.Td>
                                    {row.departments?.length ?? false ? (
                                        <Text size="sm" c="gray.7" truncate>
                                            {row.departments
                                                .map((x: any) => x.departmentName)
                                                .join(', ')}
                                        </Text>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </Table.Td>
                                <Table.Td align="right">
                                    <ActionIcon variant="transparent" c="gray.6">
                                        <MoreHorizontalIcon className="size-5" />
                                    </ActionIcon>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </ScrollArea>
            <div className="flex items-center justify-between">
                <div></div>
                <Pagination total={totalCount} />
            </div>
        </div>
    );
};

export default MembersTable;
