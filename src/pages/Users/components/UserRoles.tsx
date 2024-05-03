import { RoleSubjectType } from '@/@types';
import { UserRoleModel } from '@/@types/user';
import Table, { TableColumn } from '@/components/Table';
import { UserService } from '@/services';
import { ActionIcon, Box, Button, Center, Flex, LoadingOverlay, Text, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Trash2Icon } from 'lucide-react';
import { useRequest } from 'umi';
import { PropsWithUserId } from '.';
import AssignRoleModal from './AssignRoleModal';

const UserRoleTable = Table<UserRoleModel>;

type UserRolesProps = PropsWithUserId<{}>;

export default ({ userId }: UserRolesProps) => {
    const [opened, { close, open }] = useDisclosure(false);

    const { loading, data } = useRequest(() => UserService.getUserRoles(userId));
    const { run: assignRoles, loading: assigning } = useRequest(UserService.assignRoles, {
        manual: true,
    });

    const isEmpty = (data?.length ?? 0) === 0;
    const exludeRoles = data?.map((r: any) => r.id) ?? [];

    const assign = (roleIds: string[]) => {
        assignRoles(userId, roleIds);
    };

    const columns: TableColumn<UserRoleModel>[] = [
        { dataKey: 'roleName', title: 'Name' },
        { dataKey: 'roleDescription', title: 'Description' },
        {
            dataKey: 'assignmentSubjectType',
            title: 'Assignment',
            render(value: RoleSubjectType, data) {
                let text = 'Direct';
                if (value === RoleSubjectType.UserGroup) {
                    text = `Inherited from ${data.assignmentSubjectName}`;
                }

                return <Text size="sm">{text}</Text>;
            },
        },
        {
            dataKey: 'assignmentSubjectId',
            title: '',
            width: 80,
            align: 'right',
            render() {
                return (
                    <ActionIcon variant="outline" color="red.6">
                        <Trash2Icon className="size-4" />
                    </ActionIcon>
                );
            },
        },
    ];

    return (
        <>
            <Box mih={500} pos="relative">
                <LoadingOverlay visible={loading} />
                <Flex direction="column" gap={rem(24)}>
                    <Flex align="center" justify="space-between">
                        <Text size="sm" c="gray.7">
                            All Roles assigned to this User.
                        </Text>
                        <Button onClick={open}>Assign Role</Button>
                    </Flex>

                    <Box className="flex-1">
                        <UserRoleTable columns={columns} items={data} />
                        {isEmpty && (
                            <Center className="bg-gray-100/80 rounded" p={rem(16)} mt={rem(16)}>
                                <Text size="sm" c="gray.6">
                                    There are no roles assigned to this user yet.
                                </Text>
                            </Center>
                        )}
                    </Box>
                </Flex>
            </Box>

            <AssignRoleModal
                exludeRoles={exludeRoles}
                assigning={assigning}
                opened={opened}
                onClose={close}
                onSubmit={assign}
            />
        </>
    );
};
