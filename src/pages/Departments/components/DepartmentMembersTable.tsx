import DepartmentService from '@/services/department.service';
import {
    ActionIcon,
    Avatar,
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
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';

interface ThProps extends TableThProps {
    sortable?: boolean;
    reversed?: boolean;
    sorted?: boolean;
    onSort?(): void;
}

function Th({
    sortable,
    children,
    reversed,
    sorted,
    onSort,
    ...others
}: ThProps) {
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

interface DepartmentMembersTableProps {
    departmentName: string;
    departmentId: string;
}

const DepartmentMembersTable: React.FC<DepartmentMembersTableProps> = ({
    departmentName,
    departmentId,
    ...others
}) => {
    const [scrolled, setScrolled] = useState(false);

    const {
        loading,
        error,
        data,
        run: getMembers,
    } = useRequest(DepartmentService.getDepartmentMembers, {
        manual: true,
        initialData: { totalCount: 0, items: [] },
    });

    const { totalCount, items } = data ?? {};

    useEffect(() => {
        getMembers({
            departmentId,
            pageIndex: 1,
            pageSize: 10,
            onlyDirectUsers: false,
        });
    }, [departmentId]);

    return (
        <div className="grid grid-rows-[max-content_1fr_max-content] h-full relative gap-4 overflow-hidden">
            <LoadingOverlay visible={loading} />
            <div className="flex items-center justify-between text-sm">
                <div className="flex-1 flex gap-x-4">
                    <span className="font-semibold">{departmentName}</span>
                </div>
                <div>
                    <Button variant="link">
                        <PlusIcon className="w-4 h-4" />
                        <span>添加成员</span>
                    </Button>
                </div>
            </div>
            <ScrollArea
                onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
            >
                <Table
                    horizontalSpacing="md"
                    verticalSpacing="md"
                    miw={700}
                    layout="fixed"
                >
                    <Table.Thead
                        className={cx(
                            'sticky top-0 bg-[var(--mantine-color-body)] transition-[box-shadow]',
                            { ['shadow-md']: scrolled },
                        )}
                    >
                        <Table.Tr>
                            <Th>User</Th>
                            <Th w={rem(280)}>Email</Th>
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
                                                .map(
                                                    (x: any) =>
                                                        x.departmentName,
                                                )
                                                .join(', ')}
                                        </Text>
                                    ) : (
                                        <span>-</span>
                                    )}
                                </Table.Td>
                                <Table.Td align="right">
                                    <ActionIcon
                                        variant="transparent"
                                        c="gray.6"
                                    >
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

export default DepartmentMembersTable;
