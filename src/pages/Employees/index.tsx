import ContentContainer from '@/components/ContentContainer';
import EmptyState from '@/components/EmptyState';
import PageHeader from '@/components/PageHeader';
import Table, { TableColumn } from '@/components/Table';
import { Button, Group, Text, TextInput, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { UserRoundPlusIcon, UserRoundSearchIcon } from 'lucide-react';
import { memo } from 'react';
import { Icon } from 'umi';

const EmployeeTable = Table<any>;

const columns: TableColumn[] = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
];

const items = [
    { name: 'John Doe', email: 'sdfdf@gmail.com' },
    { name: 'Jane Doe', email: 'dsgdgsd@ookok.com' },
];

export default function Page() {
    const [opened, { close, open }] = useDisclosure(false);

    const OnboardingButton = memo(() => (
        <Button onClick={open}>
            <Group gap={rem(4)}>
                <UserRoundPlusIcon className="size-4 mr-1" />
                <Text size="sm">Employee Onboarding</Text>
            </Group>
        </Button>
    ));

    const isEmpty = false;

    return (
        <>
            <ContentContainer>
                <div className="grid grid-cols-1 gap-y-10">
                    <PageHeader>
                        <PageHeader.Content>
                            <PageHeader.Title>Employess</PageHeader.Title>
                            <PageHeader.Description>
                                An easy to use UI to help administrators manage
                                user identities including password resets,
                                creating and provisioning, blocking and deleting
                                users.
                            </PageHeader.Description>
                        </PageHeader.Content>
                        <PageHeader.Actions>
                            {!isEmpty && <OnboardingButton />}
                        </PageHeader.Actions>
                    </PageHeader>

                    {isEmpty ? (
                        <EmptyState>
                            <EmptyState.Icon>
                                <Icon
                                    height="180"
                                    width="180"
                                    icon="local:empty-1"
                                />
                            </EmptyState.Icon>
                            <EmptyState.Subtitle>
                                You don't have any employees yet.
                            </EmptyState.Subtitle>
                            <EmptyState.Content>
                                <EmptyState.Message>
                                    All of your employees will be found here.
                                </EmptyState.Message>
                                <EmptyState.Actions>
                                    <OnboardingButton />
                                </EmptyState.Actions>
                            </EmptyState.Content>
                        </EmptyState>
                    ) : (
                        <div className="grid grid-cols-1 gap-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-[1_0_auto]">
                                    <TextInput
                                        placeholder="Search of employees"
                                        leftSection={
                                            <UserRoundSearchIcon className="size-4" />
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <EmployeeTable
                                    columns={columns}
                                    items={items}
                                ></EmployeeTable>
                            </div>
                        </div>
                    )}
                </div>
            </ContentContainer>
            {opened && <div></div>}
        </>
    );
}
