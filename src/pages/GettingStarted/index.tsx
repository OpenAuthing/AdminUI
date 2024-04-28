import Content from '@/components/ContentContainer';
import PageHeader from '@/components/PageHeader';
import { Button, Space, UnstyledButton } from '@mantine/core';
import { ArrowRightIcon } from 'lucide-react';
import { FormattedMessage } from 'umi';

export default () => {
    return (
        <Content>
            <PageHeader title={<FormattedMessage id="pages.gettingstarted.header" />} />
            <Space h="md" />
            <div className="grid auto-cols-fr gap-6">
                <div className="flex rounded-xl w-full bg-gray-100">
                    <div className="p-10 flex-[3_1_0%] grid auto-cols-fr gap-6">
                        <h2 className="text-lg font-semibold">
                            <FormattedMessage id="pages.gettingstarted.section1.title" />
                        </h2>
                        <p className="text-gray-600 text-sm">
                            <FormattedMessage id="pages.gettingstarted.section1.content" />
                        </p>
                        <div className="flex gap-x-3 items-center">
                            <Button>
                                <FormattedMessage id="pages.gettingstarted.section1.button" />
                            </Button>
                            <UnstyledButton
                                component="a"
                                href="/docs/"
                                target="_blank"
                                className="text-primary-600 text-sm"
                            >
                                <FormattedMessage id="pages.gettingstarted.section1.learnmore" />
                            </UnstyledButton>
                        </div>
                    </div>
                    <div className="flex-[2_1_0%]"></div>
                </div>
                <h2 className="text-lg font-medium">
                    <FormattedMessage id="pages.gettingstarted.nextsteps.title" />
                </h2>
                <div className="grid auto-cols-fr gap-4">
                    <div className="p-8 border rounded-lg grid grid-cols-[74px_3fr_2fr]">
                        <div>
                            <div className="size-12 rounded-full bg-gray-200"></div>
                        </div>
                        <div>
                            <h3 className="mb-1 text-base font-medium">Invite your team members</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Add additional admins to help with your integration and act as a
                                backup account in case you lose access.
                            </p>
                            <div className="mt-4 text-sm">
                                <span className="text-gray-600">Learn more about</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">
                            <UnstyledButton
                                component="a"
                                href="/"
                                className="text-primary-600 text-sm flex items-center gap-x-1.5 hover:text-primary-800 px-2 py-1.5 rounded transition-colors"
                            >
                                Invite members
                                <ArrowRightIcon className="size-4" />
                            </UnstyledButton>
                        </div>
                    </div>
                </div>
            </div>
        </Content>
    );
};
