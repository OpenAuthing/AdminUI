import { GetUserGroupMembersRes } from '@/@types/usergroup';
import Table, { TableColumn } from '@/components/Table';
import { UserGroupService } from '@/services';
import { Box, Button, Center, Flex, LoadingOverlay, rem, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FormattedMessage, useIntl, useRequest } from 'umi';
import { AddMembersModal } from './AddMembersModal';

const MembersTable = Table<GetUserGroupMembersRes>;

interface MembersProps {
    groupId: string;
}

const Members: React.FC<MembersProps> = ({ groupId }) => {
    const intl = useIntl();
    const [opened, { open, close }] = useDisclosure(false);

    const { data } = useRequest(() => UserGroupService.getGroupMembers(groupId));
    const members = (data as GetUserGroupMembersRes[]) ?? [];

    const isEmpty = members.length === 0;

    const columns: TableColumn<GetUserGroupMembersRes>[] = [
        {
            dataKey: 'nickname',
            title: 'User',
        },
        {
            dataKey: 'emailAddress',
            title: 'Email',
        },
    ];

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={false} />
                <Flex direction="column" gap={rem(24)}>
                    <Flex align="center" justify="space-between">
                        <Text size="sm" c="gray.7">
                            <FormattedMessage id="pages.usergroups.details.members.tips" />
                        </Text>
                        <Button onClick={open}>
                            <FormattedMessage id="pages.usergroups.details.members.add" />
                        </Button>
                    </Flex>

                    <Box className="flex-1">
                        <MembersTable columns={columns} items={data} />
                        {isEmpty && (
                            <Center className="bg-gray-100/80 rounded" p={rem(16)} mt={rem(16)}>
                                <Text size="sm" c="gray.6">
                                    <FormattedMessage id="pages.usergroups.details.members.norecords" />
                                </Text>
                            </Center>
                        )}
                    </Box>
                </Flex>
            </Box>
            <AddMembersModal opened={opened} onClose={close} onAdd={() => {}} />
        </>
    );
};

export { Members, MembersProps };
