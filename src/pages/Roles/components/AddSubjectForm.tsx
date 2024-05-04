import { Box, Center, SegmentedControl, SegmentedControlItem, Text, rem } from '@mantine/core';
import { UserIcon, UsersIcon } from 'lucide-react';
import { useState } from 'react';
import { FormattedMessage, Icon, useIntl } from 'umi';
import { UserGroupSelectList, UserSelectList } from './SubjectSelectList';

interface AddSubjectFormProps {}

const Types: SegmentedControlItem[] = [
    {
        label: (
            <Center style={{ gap: 10 }}>
                <UserIcon className="size-4" />
                <FormattedMessage id="common.user" />
            </Center>
        ),
        value: 'user',
    },
    {
        label: (
            <Center style={{ gap: 10 }}>
                <UsersIcon className="size-4" />
                <FormattedMessage id="common.usergroup" />
            </Center>
        ),
        value: 'group',
    },
];

const AddSubjectForm: React.FC<AddSubjectFormProps> = () => {
    const intl = useIntl();
    const [type, setType] = useState<string>(Types[0]!.value);

    return (
        <form>
            <div className="overflow-hidden grid grid-cols-2 gap-x-8 h-[480px]">
                <div className="flex flex-col overflow-hidden gap-y-2">
                    <SegmentedControl value={type} onChange={setType} data={Types} fullWidth />
                    <div className="flex-1 overflow-hidden">
                        <UserSelectList visible={type === 'user'} />
                        <UserGroupSelectList visible={type === 'group'} />
                    </div>
                </div>
                <div className="flex flex-col overflow-hidden gap-y-2">
                    <Box pt={rem(84)}>
                        <Icon
                            icon="local:arrow-1"
                            height="80"
                            width="180"
                            stroke="var(--mantine-color-gray-4)"
                        />
                        <Center>
                            <Text size="sm" c="gray.6">
                                Select one or more subjects.
                            </Text>
                        </Center>
                    </Box>
                    {/* <div className="w-full h-10 flex items-center">
                        <Text size="sm">
                            <FormattedMessage
                                id="pages.roles.subjects.selected"
                                values={{ userCount: 3, userGroupCount: 2 }} />
                        </Text>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <ScrollArea h="100%">
                            <div className='h-[2000px]'>
                                
                            </div>
                        </ScrollArea>
                    </div> */}
                </div>
            </div>
        </form>
    );
};

export { AddSubjectForm, AddSubjectFormProps };
