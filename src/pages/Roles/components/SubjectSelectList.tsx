import { ListUserModel } from '@/@types/user';
import { UserGroupService, UserService } from '@/services';
import { Avatar, Box, Flex, Group, Input, LoadingOverlay, ScrollArea, Text } from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import clsx from 'clsx';
import { SearchIcon } from 'lucide-react';
import React, { memo } from 'react';
import { useRequest } from 'umi';

interface SelectListProps {
    visible: boolean;
    onItemClick?: (item: any) => void;
}

interface SubjectSelectListProps<TData extends object> extends SelectListProps {
    style?: React.CSSProperties;
    searchPlaceholder?: string;
    service: (params: any) => Promise<any>;
    children: (item: TData) => React.ReactNode;
}

const SubjectSelectList = <TData extends object>(props: SubjectSelectListProps<TData>) => {
    const { searchPlaceholder, style, visible, service, children, onItemClick } = props;

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
                        {list.map((item, index) => (
                            <div
                                key={index}
                                className="px-1 py-2 rounded transition-colors cursor-pointer hover:bg-gray-100"
                                onClick={() => handleItemClick(item)}
                            >
                                {children(item)}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </Box>
        </div>
    );
};

const UserSelectList = memo<SelectListProps>(({ visible }) => {
    return (
        <SubjectSelectList<ListUserModel>
            visible={visible}
            searchPlaceholder="Search of users"
            service={UserService.getUsers}
        >
            {(data) => (
                <Group>
                    <Avatar src={data.avatar}>{data.userName.substring(0, 1).toUpperCase()}</Avatar>
                    <Flex direction="column">
                        <Text size="sm" fw={500}>
                            {data.nickname}
                        </Text>
                        <Text size="xs" c="gray.5">
                            {data.userName}
                        </Text>
                    </Flex>
                </Group>
            )}
        </SubjectSelectList>
    );
});

const UserGroupSelectList = memo<SelectListProps>(({ visible }) => {
    return (
        <SubjectSelectList<any>
            visible={visible}
            searchPlaceholder="Search of groups"
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
