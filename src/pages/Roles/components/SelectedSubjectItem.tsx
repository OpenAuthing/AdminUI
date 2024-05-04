import { ActionIcon, Avatar, Flex, Group, Text, rem } from '@mantine/core';
import { XIcon } from 'lucide-react';
import { SelectedItemType } from '.';

interface SelectedSubjectItemProps {
    item: SelectedItemType;
    onRemove: (item: SelectedItemType) => void;
}

const SelectedSubjectItem: React.FC<SelectedSubjectItemProps> = ({ item, onRemove }) => {
    return (
        <Group className="px-1.5 py-2 hover:bg-gray-100 rounded group cursor-pointer">
            <Avatar size={rem(38)}></Avatar>
            <Flex direction="column" style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                    {item.name}
                </Text>
                <Text size="xs" c="gray.6">
                    {item.description}
                </Text>
            </Flex>
            <ActionIcon
                className="hidden opacity-0 transition-opacity group-hover:block group-hover:opacity-100"
                variant="transparent"
                color="gray.8"
                onClick={() => onRemove(item)}
            >
                <XIcon className="size-4" />
            </ActionIcon>
        </Group>
    );
};

export { SelectedSubjectItem, SelectedSubjectItemProps };
