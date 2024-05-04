import { RoleSubjectType } from '@/@types';
import { ListRoleSubjectRes } from '@/@types/role';
import Table, { TableColumn } from '@/components/Table';
import { RoleService } from '@/services';
import { Box, Button, Center, Flex, LoadingOverlay, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRequest } from 'umi';
import { PropsWithRoleId } from '.';
import AddSubjectModal from './AddSubjectModal';

const RoleSubjectTable = Table<ListRoleSubjectRes>;

type RoleSubjectsProps = PropsWithRoleId<{}>;

const RoleSubjects: React.FC<RoleSubjectsProps> = ({ roleId }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { loading, data } = useRequest(() => RoleService.getSubjects(roleId));

    const columns: TableColumn<ListRoleSubjectRes>[] = [
        { dataKey: 'name', title: 'Name' },
        {
            dataKey: 'subjectType',
            title: 'Type',
            render(value) {
                const description = value === RoleSubjectType.User ? 'User' : 'User Group';
                return (
                    <Text size="sm" c="gray.7">
                        {description}
                    </Text>
                );
            },
        },
        { dataKey: 'id', title: '', width: 80 },
    ];

    const isEmpty = true;

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={loading} />
                <Flex direction="column" gap={rem(24)}>
                    <Flex align="center" justify="space-between">
                        <Text size="sm" c="gray.7">
                            Subjects that have this role assigned.
                        </Text>
                        <Button onClick={open}>Add Subjects</Button>
                    </Flex>

                    <Box className="flex-1">
                        <RoleSubjectTable columns={columns} items={data} />
                        {isEmpty && (
                            <Center className="bg-gray-100/80 rounded" p={rem(16)} mt={rem(16)}>
                                <Text size="sm" c="gray.6">
                                    There are no subjects assigned to this role
                                </Text>
                            </Center>
                        )}
                    </Box>
                </Flex>
            </Box>
            <AddSubjectModal opened={opened} onClose={close} />
        </>
    );
};

export default RoleSubjects;
