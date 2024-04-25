import ContentContainer from '@/components/ContentContainer';
import EmptyState from '@/components/EmptyState';
import PageHeader from '@/components/PageHeader';
import { Button } from '@mantine/core';
import { PlusIcon } from 'lucide-react';
import { Icon } from 'umi';

export default function Page() {
    return (
        <ContentContainer>
            <div className="grid grid-cols-1 gap-y-10">
                <PageHeader>
                    <PageHeader.Content>
                        <PageHeader.Title>Users</PageHeader.Title>
                        <PageHeader.Description>
                            An easy to use UI to help administrators manage user
                            identities including password resets, creating and
                            provisioning, blocking and deleting users.
                        </PageHeader.Description>
                    </PageHeader.Content>
                </PageHeader>

                <div>
                    <EmptyState>
                        <EmptyState.Icon>
                            <Icon
                                height="180"
                                width="180"
                                icon="local:no-user"
                            />
                        </EmptyState.Icon>
                        <EmptyState.Subtitle>
                            You don't have any users yet.
                        </EmptyState.Subtitle>
                        <EmptyState.Content>
                            <EmptyState.Message>
                                All of your users will be found here, regardless
                                of the authentication method they use to access
                                your applications.
                            </EmptyState.Message>
                            <EmptyState.Actions>
                                <Button>
                                    <PlusIcon className="size-5 mr-2" />
                                    Create User
                                </Button>
                            </EmptyState.Actions>
                        </EmptyState.Content>
                    </EmptyState>
                </div>
            </div>
        </ContentContainer>
    );
}
