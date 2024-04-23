
import { Text, Table, CopyButton, Tooltip, ActionIcon, CheckIcon, Menu } from '@mantine/core';
import { CopyIcon, MoreHorizontalIcon } from 'lucide-react';
import { FormattedMessage, Link, useIntl } from 'umi';
import ClientId from './ClientId';

export type Application = {
    id: string;
    name: string;
    clientId: string;
    type: string;
    typeLabel: string;
}

type ApplicationListProps = {
    list?: Application[]
}

const ApplicationList = ({
    list
}: ApplicationListProps) => {
    const intl = useIntl()

    return (
        <div className="">
            <Table withRowBorders={false}>
                <Table.Tbody>
                    {list?.map((item) => (
                        <Table.Tr className="border-gray-200 border-solid border-b hover:bg-gray-100" key={item.id}>
                            <Table.Td className="p-4" width={350}>
                                <Link to={`/admin/applications/${item.id}/settings`}>
                                    <div className="flex gap-x-4 items-start">
                                        <div className="size-10 bg-gray-200/80 rounded flex items-center justify-center">

                                        </div>
                                        <div className="flex-1 grid grid-cols-1 justify-between">

                                            <Text truncate="end" size="sm" c="primary" fw={500}>
                                                {item.name}
                                            </Text>

                                            <Text size="sm" className="text-gray-500" fw={500}>
                                                {item.typeLabel}
                                            </Text>
                                        </div>
                                    </div>
                                </Link>
                            </Table.Td>
                            <Table.Td className="p-4">
                                <ClientId value={item.clientId} />
                            </Table.Td>
                            <Table.Td className="p-4" width={70}>
                                <div className="flex items-center justify-end">
                                    <Menu width={180} position="bottom-end" shadow="lg">
                                        <Menu.Target>
                                            <ActionIcon variant="default" aria-label="Settings">
                                                <MoreHorizontalIcon className="size-5 stroke-gray-500" />
                                            </ActionIcon>
                                        </Menu.Target>
                                        <Menu.Dropdown className="p-2">
                                            <Link to={`/admin/applications/${item.id}/quickstart`}>
                                                <Menu.Item className="text-[13px] font-medium px-2 py-1 text-gray-500">
                                                    <FormattedMessage id="pages.applications.list.actions.quickstart" />
                                                </Menu.Item>
                                            </Link>
                                            <Link to={`/admin/applications/${item.id}/settings`}>
                                                <Menu.Item className="text-[13px] font-medium px-2 py-1 text-gray-500">
                                                    <FormattedMessage id="pages.applications.list.actions.settings" />
                                                </Menu.Item>
                                            </Link>
                                            <Link to={`/admin/applications/${item.id}/credentials`}>
                                                <Menu.Item className="text-[13px] font-medium px-2 py-1 text-gray-500">
                                                    <FormattedMessage id="pages.applications.list.actions.credentials" />
                                                </Menu.Item>
                                            </Link>
                                        </Menu.Dropdown>
                                    </Menu>
                                </div>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    )
}

export default ApplicationList