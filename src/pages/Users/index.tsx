import ContentContainer from '@/components/ContentContainer';
import EmptyState from '@/components/EmptyState';
import PageHeader from '@/components/PageHeader';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PlusIcon } from 'lucide-react';
import { memo } from 'react';
import { Icon } from 'umi';
import CreateUserDialog from './components/CreateUserDialog';

export default function Page() {
    const [opened, { close, open }] = useDisclosure(false);

    const CreateUserButton = memo(() => (
        <Button onClick={open}>
            <PlusIcon className="size-5 mr-2" />
            Create User
        </Button>
    ));

    return (
        <>
            <ContentContainer>
                <div className="grid grid-cols-1 gap-y-10">
                    <PageHeader>
                        <PageHeader.Content>
                            <PageHeader.Title>Users</PageHeader.Title>
                            <PageHeader.Description>
                                An easy to use UI to help administrators manage
                                user identities including password resets,
                                creating and provisioning, blocking and deleting
                                users.
                            </PageHeader.Description>
                        </PageHeader.Content>
                    </PageHeader>

                    <div>
                        <EmptyState>
                            <EmptyState.Icon>
                                <Icon
                                    height="180"
                                    width="180"
                                    icon="local:empty-1"
                                />
                            </EmptyState.Icon>
                            <EmptyState.Subtitle>
                                You don't have any users yet.
                            </EmptyState.Subtitle>
                            <EmptyState.Content>
                                <EmptyState.Message>
                                    All of your users will be found here,
                                    regardless of the authentication method they
                                    use to access your applications.
                                </EmptyState.Message>
                                <EmptyState.Actions>
                                    <CreateUserButton />
                                </EmptyState.Actions>
                            </EmptyState.Content>
                        </EmptyState>
                    </div>
                </div>
            </ContentContainer>
            {opened && <CreateUserDialog opened={opened} onClose={close} />}
        </>
    );
}
