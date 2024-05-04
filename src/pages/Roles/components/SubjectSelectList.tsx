import { ListUserModel } from '@/@types/user';
import { UserGroupService, UserService } from '@/services';
import {
    Avatar,
    Box,
    Center,
    Flex,
    Group,
    Input,
    LoadingOverlay,
    ScrollArea,
    Text,
    rem,
} from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import clsx from 'clsx';
import { CheckIcon, SearchIcon } from 'lucide-react';
import React, { memo } from 'react';
import { useIntl, useRequest } from 'umi';

interface SelectListProps {
    visible: boolean;
    onItemClick?: (item: any) => void;
    selectedIds?: Set<string>;
}

interface SubjectSelectListProps<TData extends object> extends SelectListProps {
    style?: React.CSSProperties;
    searchPlaceholder?: string;
    service: (params: any) => Promise<any>;
    children: (item: TData, isSelected: boolean) => React.ReactNode;
}

const SubjectSelectList = <TData extends { id: string }>(props: SubjectSelectListProps<TData>) => {
    const { searchPlaceholder, style, visible, selectedIds, service, children, onItemClick } =
        props;

    const [searchKey, setSearchKey] = useInputState('');
    const [debouncedSearchKey] = useDebouncedValue(searchKey, 200);

    const { loading, data } = useRequest(
        (params) => service({ ...params, searchKey: debouncedSearchKey }),
        {
            manual: false,
            throttleInterval: 500,
            paginated: true,
            refreshDeps: [debouncedSearchKey],
            formatResult: ({ data }) => ({
                total: data?.totalCount,
                list: data?.items as TData[],
            }),
        },
    );
    const { list = [] } = data ?? {};

    const handleItemClick = (item: TData) => {
        onItemClick?.(item);
    };

    return (
        <div
            style={style}
            className={clsx('flex flex-col gap-y-1 h-full overflow-hidden', { hidden: !visible })}
        >
            <div className="h-10">
                <Input
                    value={searchKey}
                    onChange={setSearchKey}
                    leftSection={<SearchIcon className="size-4" />}
                    placeholder={searchPlaceholder}
                />
            </div>
            <Box className="flex-1 h-full" pos="relative">
                <LoadingOverlay visible={loading} />
                <ScrollArea h="100%">
                    <div className="grid grid-cols-1 gap-y-1">
                        {list.map((item) => {
                            const isSelected = selectedIds?.has(item.id) ?? false;
                            return (
                                <div
                                    key={item.id}
                                    className={clsx(
                                        'px-1 py-2 rounded transition-colors cursor-pointer',
                                        isSelected ? 'bg-primary-50/60' : 'hover:bg-gray-100',
                                    )}
                                    onClick={() => handleItemClick(item)}
                                >
                                    {children(item, isSelected)}
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </Box>
        </div>
    );
};

const UserSelectList = memo<SelectListProps>((props) => {
    const intl = useIntl();
    return (
        <SubjectSelectList<ListUserModel>
            {...props}
            searchPlaceholder={intl.formatMessage({ id: 'pages.users.search.placeholder' })}
            service={UserService.getUsers}
        >
            {(data, selected) => (
                <Group>
                    <Avatar src={data.avatar}>{data.userName.substring(0, 1).toUpperCase()}</Avatar>
                    <Flex style={{ flex: 1 }} direction="column">
                        <Text size="sm" fw={500}>
                            {data.nickname}
                        </Text>
                        <Text size="xs" c="gray.5">
                            {data.userName}
                        </Text>
                    </Flex>
                    <Center w={rem(40)}>
                        {selected && <CheckIcon className="size-4 text-green-500" />}
                    </Center>
                </Group>
            )}
        </SubjectSelectList>
    );
});

const UserGroupSelectList = memo<SelectListProps>((props) => {
    const intl = useIntl();
    return (
        <SubjectSelectList<any>
            {...props}
            searchPlaceholder={intl.formatMessage({ id: 'pages.usergroups.search.placeholder' })}
            service={UserGroupService.getGroups}
        >
            {(data) => <div>{data.name}</div>}
        </SubjectSelectList>
    );
});

export {
    SelectListProps,
    SubjectSelectList,
    SubjectSelectListProps,
    UserGroupSelectList,
    UserSelectList,
};
