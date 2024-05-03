import { ListRoleSubjectRes } from '@/@types/role';
import Table, { TableColumn } from '@/components/Table';
import { Box, Button, Center, Flex, LoadingOverlay, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PropsWithRoleId } from '.';
import AddSubjectModal from './AddSubjectModal';

const RoleSubjectTable = Table<ListRoleSubjectRes>;

type RoleSubjectsProps = PropsWithRoleId<{}>;

const RoleSubjects: React.FC<RoleSubjectsProps> = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const columns: TableColumn<ListRoleSubjectRes>[] = [
        { dataKey: 'name', title: 'Name' },
        { dataKey: 'type', title: 'Type' },
        { dataKey: 'id', title: '' },
    ];

    const isEmpty = true;

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={false} />
                <Flex direction="column" gap={rem(24)}>
                    <Flex align="center" justify="space-between">
                        <Text size="sm" c="gray.7">
                            Subjects that have this role assigned.
                        </Text>
                        <Button onClick={open}>Add Subjects</Button>
                    </Flex>

                    <Box className="flex-1">
                        <RoleSubjectTable columns={columns} />
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
