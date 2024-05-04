import { RoleSubjectType } from '@/@types';
import { AddRoleSubjectItem } from '@/@types/role';
import {
    Box,
    Button,
    Center,
    Flex,
    ScrollArea,
    SegmentedControl,
    SegmentedControlItem,
    Space,
    Text,
    rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useListState, useSet } from '@mantine/hooks';
import { UserIcon, UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormattedMessage, Icon } from 'umi';
import { SelectedItemType } from '.';
import { SelectedSubjectItem } from './SelectedSubjectItem';
import { UserGroupSelectList, UserSelectList } from './SubjectSelectList';

const Types: SegmentedControlItem[] = [
    {
        label: (
            <Center style={{ gap: 10 }}>
                <UserIcon className="size-4" />
                <FormattedMessage id="common.user" />
            </Center>
        ),
        value: 'user',
    },
    {
        label: (
            <Center style={{ gap: 10 }}>
                <UsersIcon className="size-4" />
                <FormattedMessage id="common.usergroup" />
            </Center>
        ),
        value: 'group',
    },
];

interface AddSubjectFormProps {
    onCancel: () => void;
    onAdd: (subjects: AddRoleSubjectItem[]) => Promise<void>;
}

const AddSubjectForm: React.FC<AddSubjectFormProps> = ({ onCancel, onAdd }) => {
    const form = useForm({
        mode: 'uncontrolled',
    });
    const [type, setType] = useState<string>(Types[0]!.value);
    const [selectedItems, selectedItemsHandlers] = useListState<SelectedItemType>([]);
    const selectedIds = useSet<string>([]);
    const [statisticalValues, setStatisticalValues] = useState<Record<string, number>>({
        user: 0,
        group: 0,
    });

    useEffect(() => {
        selectedIds.clear();
        selectedItems.filter((x) => x.type === type).forEach((x) => selectedIds.add(x.id));
    }, [type, selectedItems]);

    useEffect(() => {
        const statisticalValues = selectedItems.reduce(
            (acc, item) => {
                if (acc[item.type]) {
                    acc[item.type]++;
                } else {
                    acc[item.type] = 1;
                }
                return acc;
            },
            { user: 0, group: 0 } as Record<string, number>,
        );
        setStatisticalValues(statisticalValues);
    }, [selectedItems]);

    const handleItemClick = (type: 'user' | 'group', item: any) => {
        const index = selectedItems.findIndex((x) => x.type === type && x.id === item.id);
        if (index >= 0) {
            selectedItemsHandlers.remove(index);
        } else {
            const newItem: SelectedItemType = {
                type,
                id: item.id,
                name: item.name || item.nickname,
                description: item.description || item.userName,
                avatar: item.avatar,
            };

            selectedItemsHandlers.append(newItem);
        }
    };

    const handleRemoveItem = (item: SelectedItemType) => {
        selectedItemsHandlers.filter((x) => x.id !== item.id);
    };

    const handleSubmit = async () => {
        const subjects: AddRoleSubjectItem[] = selectedItems.map((x) => ({
            id: x.id,
            type: x.type === 'group' ? RoleSubjectType.UserGroup : RoleSubjectType.User,
        }));

        await onAdd(subjects);
    };

    const isEmpty = selectedItems.length === 0;

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="overflow-hidden grid grid-cols-2 gap-x-8 h-[450px]">
                <div className="flex flex-col overflow-hidden gap-y-2">
                    <SegmentedControl value={type} onChange={setType} data={Types} fullWidth />
                    <div className="flex-1 overflow-hidden">
                        <UserSelectList
                            visible={type === 'user'}
                            selectedIds={selectedIds}
                            onItemClick={(item) => handleItemClick('user', item)}
                        />
                        <UserGroupSelectList
                            visible={type === 'group'}
                            selectedIds={selectedIds}
                            onItemClick={(item) => handleItemClick('group', item)}
                        />
                    </div>
                </div>
                <div className="flex flex-col overflow-hidden gap-y-2">
                    {isEmpty ? (
                        <Box className="flex flex-col justify-center h-full">
                            <Icon
                                icon="local:arrow-1"
                                height="80"
                                width="200"
                                stroke="var(--mantine-color-gray-4)"
                            />
                            <Center>
                                <Text size="sm" c="gray.6">
                                    <FormattedMessage id="pages.roles.addsubjects.noselected" />
                                </Text>
                            </Center>
                            <Space h={rem(80)} />
                        </Box>
                    ) : (
                        <>
                            <div className="w-full h-10 flex items-center">
                                <Text size="sm">
                                    <FormattedMessage
                                        id="pages.roles.subjects.selected"
                                        values={statisticalValues}
                                    />
                                </Text>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <ScrollArea h="100%">
                                    <Flex direction="column" gap={rem(4)}>
                                        {selectedItems.map((item) => (
                                            <SelectedSubjectItem
                                                key={item.id}
                                                item={item}
                                                onRemove={handleRemoveItem}
                                            />
                                        ))}
                                    </Flex>
                                </ScrollArea>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-end gap-x-2">
                <Button variant="default" onClick={onCancel}>
                    <FormattedMessage id="common.cancel" />
                </Button>
                <Button type="submit" disabled={isEmpty}>
                    <FormattedMessage id="common.add" />
                </Button>
            </div>
        </form>
    );
};

export { AddSubjectForm, AddSubjectFormProps };
