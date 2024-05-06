import { GetUserGroupRes } from '@/@types/usergroup';
import ContentContainer from '@/components/ContentContainer';
import PageBackButton from '@/components/PageBackButton';
import PageHeader from '@/components/PageHeader';
import withRouteParams from '@/hoc/withRouteParams';
import { UserGroupService } from '@/services';
import {
    Box,
    Button,
    Flex,
    Grid,
    LoadingOverlay,
    Space,
    Tabs,
    Text,
    TextInput,
    Textarea,
    rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormattedMessage, useIntl, useRequest } from 'umi';
import { Members } from './components/Members';

type UserGroupDetailsPageProps = {
    id: string;
};

type UserGroupEditFormValues = {
    name: string;
    description: string;
};

const UserGroupDetailsPage: React.FC<UserGroupDetailsPageProps> = ({ id }) => {
    const intl = useIntl();
    const form = useForm<UserGroupEditFormValues>({
        mode: 'uncontrolled',
    });

    const { data } = useRequest(() => UserGroupService.getGroup(id), {
        onSuccess(data) {
            const values = data as GetUserGroupRes;
            if (values) {
                form.setValues(values);
            }
        },
    });

    const userGroup = (data as GetUserGroupRes) ?? {};

    return (
        <ContentContainer>
            <PageBackButton
                text={intl.formatMessage({ id: 'pages.usergroups.details.back' })}
                backTo="/admin/groups"
            />
            <Space h={rem(16)} />
            <Flex pos="relative" direction="column" rowGap={rem(40)}>
                <LoadingOverlay visible={false} zIndex={201} />

                <PageHeader>
                    <PageHeader.Content>
                        <PageHeader.Title>{userGroup.name}</PageHeader.Title>
                        <PageHeader.Description>
                            <Text>{userGroup.description}</Text>
                        </PageHeader.Description>
                    </PageHeader.Content>
                </PageHeader>

                <Box>
                    <Tabs keepMounted={false} defaultValue="details">
                        <Flex direction="column" gap={rem(24)}>
                            <Tabs.List>
                                <Tabs.Tab value="details">
                                    <FormattedMessage id="pages.usergroups.details.tabs.details" />
                                </Tabs.Tab>
                                <Tabs.Tab value="members">
                                    <FormattedMessage id="pages.usergroups.details.tabs.members" />
                                </Tabs.Tab>
                            </Tabs.List>

                            <Box py={rem(16)}>
                                <Tabs.Panel value="details">
                                    <Flex direction="column" rowGap={rem(40)}>
                                        <Grid>
                                            <Grid.Col span={{ base: 12, lg: 8 }}>
                                                <form>
                                                    <Flex direction="column" gap={rem(24)}>
                                                        <TextInput
                                                            label={intl.formatMessage({
                                                                id: 'pages.usergroups.details.editform.name.label',
                                                            })}
                                                            placeholder={intl.formatMessage({
                                                                id: 'pages.usergroups.details.editform.name.placeholder',
                                                            })}
                                                            required
                                                            {...form.getInputProps('name')}
                                                        />
                                                        <Textarea
                                                            label={intl.formatMessage({
                                                                id: 'pages.usergroups.details.editform.description.label',
                                                            })}
                                                            placeholder={intl.formatMessage({
                                                                id: 'pages.usergroups.details.editform.description.placeholder',
                                                            })}
                                                            rows={2}
                                                            required
                                                            {...form.getInputProps('description')}
                                                        />
                                                        <Flex columnGap={rem(8)}>
                                                            <Button type="submit">
                                                                <FormattedMessage id="pages.usergroups.details.editform.save" />
                                                            </Button>
                                                        </Flex>
                                                    </Flex>
                                                </form>
                                            </Grid.Col>
                                        </Grid>

                                        <Flex gap={rem(16)} direction="column">
                                            <h2 className="text-xl font-medium">
                                                <FormattedMessage id="pages.usergroups.details.dangerzone.title" />
                                            </h2>
                                            <div className="flex items-center p-6 rounded text-[rgb(118,28,23)] bg-[rgb(251,238,237)]">
                                                <div className="flex-1 grid grid-cols-1 gap-1">
                                                    <h6 className="text-sm font-medium leading-6">
                                                        <FormattedMessage id="pages.usergroups.details.dangerzone.delete.title" />
                                                    </h6>
                                                    <p className="text-xs leading-6">
                                                        <FormattedMessage id="pages.usergroups.details.dangerzone.delete.content" />
                                                    </p>
                                                </div>
                                                <div>
                                                    <Button variant="filled" color="red.9">
                                                        <FormattedMessage id="pages.usergroups.details.dangerzone.delete.button" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Flex>
                                    </Flex>
                                </Tabs.Panel>
                                <Tabs.Panel value="members">
                                    <Members groupId={id} />
                                </Tabs.Panel>
                            </Box>
                        </Flex>
                    </Tabs>
                </Box>
            </Flex>
        </ContentContainer>
    );
};

export default withRouteParams(UserGroupDetailsPage, 'id');
