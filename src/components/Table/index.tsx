import {
    Center,
    Group,
    Table as MantineTable,
    TableProps as MantineTableProps,
    TableThProps,
    Text,
    UnstyledButton,
    keys,
} from '@mantine/core';
import clsx from 'clsx';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronsDownUpIcon,
} from 'lucide-react';
import React from 'react';

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
        <MantineTable.Th {...others}>
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
        </MantineTable.Th>
    );
}

type RowRenderFunction<TData> = (item: TData) => React.ReactNode;

export type TableColumn = {
    key: string;
    title: string;
    width?: number;
    sortable?: boolean;
};

type TableProps<TData> = {
    fixedHeader?: boolean;
    scrolled?: boolean;
    items?: TData[];
    columns: TableColumn[];
    rowRender?: RowRenderFunction<TData>;
    children?: RowRenderFunction<TData>;
} & MantineTableProps;

export const TableTd = MantineTable.Td;

function DefaultRowRender<TData extends object>(data: TData) {
    return keys(data).map((key, index) => (
        <TableTd key={index}>{data[key]?.toString() ?? '-'}</TableTd>
    ));
}

const Table = <TData extends {}>(props: TableProps<TData>) => {
    const {
        columns,
        fixedHeader,
        scrolled,
        items,
        rowRender,
        children,
        ...others
    } = props;

    const rowRenderFunc = rowRender || children || DefaultRowRender;

    return (
        <MantineTable
            horizontalSpacing="md"
            verticalSpacing="md"
            layout="fixed"
            {...others}
        >
            <MantineTable.Thead
                className={clsx(
                    {
                        ['sticky top-0 bg-[var(--mantine-color-body)] transition-[box-shadow]']:
                            fixedHeader,
                    },
                    { ['shadow-md']: fixedHeader && scrolled },
                )}
            >
                <MantineTable.Tr>
                    {columns.map((column) => (
                        <Th
                            key={column.key}
                            sortable={column.sortable}
                            w={column.width}
                        >
                            {column.title}
                        </Th>
                    ))}
                </MantineTable.Tr>
            </MantineTable.Thead>
            <MantineTable.Tbody>
                {items?.map((row: any, index) => (
                    <MantineTable.Tr key={index}>
                        {rowRenderFunc && rowRenderFunc(row)}
                    </MantineTable.Tr>
                ))}
            </MantineTable.Tbody>
        </MantineTable>
    );
};

export default Table;
