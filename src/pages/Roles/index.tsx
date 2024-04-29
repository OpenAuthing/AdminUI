import ContentContainer from '@/components/ContentContainer';
import EmptyState from '@/components/EmptyState';
import PageHeader from '@/components/PageHeader';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PlusIcon } from 'lucide-react';
import { memo } from 'react';
import { Icon } from 'umi';
import CreateRoleModal from './components/CreateRoleModal';

export default function Page() {
    const [opened, { open, close }] = useDisclosure(false);

    const CreateRoleButton = memo(() => (
        <Button onClick={open}>
            <PlusIcon className="size-5 mr-2" />
            Create Role
        </Button>
    ));

    return (
        <>
            <ContentContainer>
                <div className="grid grid-cols-1 gap-y-10">
                    <PageHeader>
                        <PageHeader.Content>
                            <PageHeader.Title>Roles</PageHeader.Title>
                            <PageHeader.Description>
                                Create and manage Roles for your applications. Roles contain
                                collections of Permissions and can be assigned to Users.
                            </PageHeader.Description>
                        </PageHeader.Content>
                    </PageHeader>

                    <div>
                        <EmptyState>
                            <EmptyState.Icon>
                                <Icon height="180" width="180" icon="local:empty-2" />
                            </EmptyState.Icon>
                            <EmptyState.Subtitle>You don't have any roles yet.</EmptyState.Subtitle>
                            <EmptyState.Content>
                                <EmptyState.Message>
                                    Create roles to represent the types of users that access your
                                    applications. Assign permissions to those roles to control what
                                    users are allowed to do in your apps.
                                </EmptyState.Message>
                                <EmptyState.Actions>
                                    <CreateRoleButton />
                                </EmptyState.Actions>
                            </EmptyState.Content>
                        </EmptyState>
                    </div>
                </div>
            </ContentContainer>
            <CreateRoleModal opened={opened} onClose={close} />
        </>
    );
}
