import Content from '@/components/ContentContainer';
import PageHeader from '@/components/PageHeader';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PlusIcon } from 'lucide-react';
import { FormattedMessage } from 'umi';
import ApplicationList, { Application } from './components/ApplicationList';
import CreateApplicationModal from './components/CreateApplicationModal';

export default function Page() {
    const [opened, { open, close }] = useDisclosure(false);

    const applications: Application[] = [
        {
            id: '1',
            name: 'Application 1',
            clientId: 'CTnMLetv8CVkxruo3QAtDbBZ70OL8t9q',
            type: 'spa',
            typeLabel: 'Single Page Application',
        },
        {
            id: '2',
            name: 'Application 1',
            clientId: 'CTnMLetv8CVkxruo3QAtDbBZ70OL8t9q',
            type: 'native',
            typeLabel: 'Native Application',
        },
    ];

    return (
        <Content>
            <div className="grid grid-cols-1 gap-y-10">
                <PageHeader>
                    <PageHeader.Content>
                        <PageHeader.Title>
                            <FormattedMessage id="pages.applications.header.title" />
                        </PageHeader.Title>
                        <PageHeader.Description>
                            <FormattedMessage id="pages.applications.header.content" />
                        </PageHeader.Description>
                    </PageHeader.Content>
                    <PageHeader.Actions>
                        <Button onClick={open}>
                            <PlusIcon className="size-4 mr-1" />
                            <span className="text-sm">
                                <FormattedMessage id="pages.applications.header.actions.create" />
                            </span>
                        </Button>
                    </PageHeader.Actions>
                </PageHeader>
                <div>
                    <ApplicationList list={applications} />
                </div>
            </div>
            <CreateApplicationModal opened={opened} onClose={close} />
        </Content>
    );
}
