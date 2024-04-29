import {
    Center,
    Group,
    Table as MantineTable,
    TableProps as MantineTableProps,
    TableThProps,
    Text,
    UnstyledButton,
} from '@mantine/core';
import clsx from 'clsx';
import { ChevronDownIcon, ChevronUpIcon, ChevronsDownUpIcon } from 'lucide-react';
import React from 'react';

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
        <MantineTable.Th {...others}>
            <UnstyledButton
                onClick={onSort}
                className={clsx(sortable ? 'cursor-pointer' : 'cursor-default')}
            >
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

type RowRenderFunction<TData> = (data: TData, columns: TableColumn<TData>[]) => React.ReactNode;

export type TableColumn<TData> = {
    dataKey: keyof TData;
    title: string;
    width?: number | string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right' | 'justify' | 'char';
    render?(value: any, data: TData): React.ReactNode;
};

type TableProps<TData> = {
    fixedHeader?: boolean;
    scrolled?: boolean;
    items?: TData[];
    columns: TableColumn<TData>[];
    rowRender?: RowRenderFunction<TData>;
    children?: RowRenderFunction<TData>;
} & MantineTableProps;

export const TableTd = MantineTable.Td;

const DefaultRowRender = <TData extends {}>(data: TData, columns: TableColumn<TData>[]) => {
    return columns.map((column, index) => {
        const value = data[column.dataKey];

        if (column.render) {
            return (
                <TableTd key={index} align={column.align}>
                    {column.render(value, data)}
                </TableTd>
            );
        }

        const content = value?.toString() ?? '-';

        return (
            <TableTd key={index} align={column.align}>
                <Text size="sm" truncate>
                    {content}
                </Text>
            </TableTd>
        );
    });
};

const Table = <TData extends {}>(props: TableProps<TData>) => {
    const { columns, fixedHeader, scrolled, items, rowRender, children, ...others } = props;

    const rowRenderFunc = rowRender || children || DefaultRowRender;

    return (
        <MantineTable horizontalSpacing="md" verticalSpacing="md" layout="fixed" {...others}>
            <MantineTable.Thead
                className={clsx(
                    {
                        'sticky top-0 bg-[var(--mantine-color-body)] transition-[box-shadow]':
                            fixedHeader,
                    },
                    { ['shadow-md']: fixedHeader && scrolled },
                )}
            >
                <MantineTable.Tr>
                    {columns.map((column) => (
                        <Th
                            key={column.dataKey.toString()}
                            sortable={column.sortable}
                            w={column.width}
                            align={column.align}
                        >
                            {column.title}
                        </Th>
                    ))}
                </MantineTable.Tr>
            </MantineTable.Thead>
            <MantineTable.Tbody>
                {items?.map((row: any, index) => (
                    <MantineTable.Tr key={index}>{rowRenderFunc(row, columns)}</MantineTable.Tr>
                ))}
            </MantineTable.Tbody>
        </MantineTable>
    );
};

export default Table;
