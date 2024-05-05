import { RoleSubjectType } from '@/@types';
import { AddRoleSubjectItem, ListRoleSubjectRes } from '@/@types/role';
import Table, { TableColumn } from '@/components/Table';
import { RoleService } from '@/services';
import {
    ActionIcon,
    Avatar,
    Badge,
    Box,
    Button,
    Center,
    Flex,
    Group,
    LoadingOverlay,
    Text,
    rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { Trash2Icon } from 'lucide-react';
import { FormattedDate, FormattedMessage, useIntl, useRequest } from 'umi';
import { PropsWithRoleId } from '.';
import AddSubjectModal from './AddSubjectModal';

const RoleSubjectTable = Table<ListRoleSubjectRes>;

type RoleSubjectsProps = PropsWithRoleId<{}>;

const RoleSubjects: React.FC<RoleSubjectsProps> = ({ roleId }) => {
    const intl = useIntl();

    const [opened, { open, close }] = useDisclosure(false);

    const { loading, data, refresh } = useRequest(() => RoleService.getSubjects(roleId));
    const { run: addSubjects } = useRequest(RoleService.addSubjects, {
        manual: true,
        async onSuccess(data, params) {
            close();

            await refresh();
        },
    });
    const { run: deleteSubject } = useRequest(RoleService.deleteSubject, {
        manual: true,
        async onSuccess(data, params) {
            await refresh();
        },
    });

    const isEmpty = data?.length === 0 ?? true;

    const handleAddSubjects = async (subjects: AddRoleSubjectItem[]) => {
        await addSubjects(roleId, { subjects });
    };

    const handleRemove = (subjectId: string, subjectName: string) => {
        modals.openConfirmModal({
            title: intl.formatMessage({
                id: 'pages.roles.details.subjects.remove.confirmmodal.title',
            }),
            children: (
                <Text size="sm">
                    {intl.formatMessage(
                        {
                            id: 'pages.roles.details.subjects.remove.confirmmodal.content',
                        },
                        { name: subjectName },
                    )}
                </Text>
            ),
            centered: true,
            labels: {
                confirm: intl.formatMessage({
                    id: 'pages.roles.details.subjects.remove.confirmmodal.confirm',
                }),
                cancel: intl.formatMessage({
                    id: 'pages.roles.details.subjects.remove.confirmmodal.cancel',
                }),
            },
            confirmProps: { color: 'red.8' },
            onConfirm: () => deleteSubject(roleId, subjectId),
        });
    };

    const columns: TableColumn<ListRoleSubjectRes>[] = [
        {
            dataKey: 'name',
            title: intl.formatMessage({ id: 'pages.roles.details.subjects.table.columns.name' }),
            render(value, data) {
                return (
                    <Group>
                        <Avatar src={data.avatar} size={rem(38)}>
                            {value.slice(0, 1).toUpperCase()}
                        </Avatar>
                        <Flex direction="column">
                            <Text size="sm" fw={500}>
                                {value}
                            </Text>
                            <Text size="xs" c="gray.6">
                                {data.description}
                            </Text>
                        </Flex>
                    </Group>
                );
            },
        },
        {
            dataKey: 'subjectType',
            title: intl.formatMessage({ id: 'pages.roles.details.subjects.table.columns.type' }),
            render(value) {
                if (value === RoleSubjectType.UserGroup) {
                    return (
                        <Badge color="grape">
                            <FormattedMessage id="common.usergroup" />
                        </Badge>
                    );
                }

                return (
                    <Badge color="indigo">
                        <FormattedMessage id="common.user" />
                    </Badge>
                );
            },
        },
        {
            dataKey: 'creationTime',
            title: intl.formatMessage({
                id: 'pages.roles.details.subjects.table.columns.creationtime',
            }),
            render(value) {
                return (
                    <Text size="sm" c="gray.6">
                        <FormattedDate
                            value={value}
                            year="numeric"
                            month="long"
                            day="numeric"
                            hour="numeric"
                            minute="numeric"
                            second="numeric"
                        />
                    </Text>
                );
            },
        },
        {
            dataKey: 'id',
            title: '',
            width: 80,
            render(value, data) {
                return (
                    <ActionIcon
                        variant="outline"
                        color="red.5"
                        onClick={() => handleRemove(value, data.name)}
                    >
                        <Trash2Icon className="size-4" />
                    </ActionIcon>
                );
            },
        },
    ];

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={loading} />
                <Flex direction="column" gap={rem(24)}>
                    <Flex align="center" justify="space-between">
                        <Text size="sm" c="gray.7">
                            <FormattedMessage id="pages.roles.details.subjects.tips" />
                        </Text>
                        <Button onClick={open}>
                            <FormattedMessage id="pages.roles.details.subjects.add" />
                        </Button>
                    </Flex>

                    <Box className="flex-1">
                        <RoleSubjectTable columns={columns} items={data} />
                        {isEmpty && (
                            <Center className="bg-gray-100/80 rounded" p={rem(16)} mt={rem(16)}>
                                <Text size="sm" c="gray.6">
                                    <FormattedMessage id="pages.roles.details.subjects.norecords" />
                                </Text>
                            </Center>
                        )}
                    </Box>
                </Flex>
            </Box>
            <AddSubjectModal opened={opened} onClose={close} onAdd={handleAddSubjects} />
        </>
    );
};

export default RoleSubjects;
