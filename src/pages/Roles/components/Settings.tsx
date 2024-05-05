import {
    Box,
    Button,
    Flex,
    Grid,
    LoadingOverlay,
    Text,
    TextInput,
    Textarea,
    rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { useEffect } from 'react';
import { FormattedMessage, useIntl, useModel } from 'umi';
import { PropsWithRoleId } from '.';

type RoleSettingsFormValues = {
    name: string;
    description: string;
};

type RoleSettingsProps = PropsWithRoleId<{}>;

const RoleSettings: React.FC<RoleSettingsProps> = ({ roleId }) => {
    const intl = useIntl();
    const { role, updating, updateRole } = useModel('Roles.details');
    const form = useForm<RoleSettingsFormValues>({
        mode: 'uncontrolled',
    });

    useEffect(() => {
        form.setValues(role);
    }, [role]);

    const handleSubmit = async (values: RoleSettingsFormValues) => {
        await updateRole(roleId, values);
    };

    const handleDelete = () => {
        modals.openConfirmModal({
            title: intl.formatMessage({
                id: 'pages.roles.details.settings.remove.confirmmodal.title',
            }),
            children: (
                <Text size="sm">
                    {intl.formatMessage({
                        id: 'pages.roles.details.settings.remove.confirmmodal.content',
                    })}
                </Text>
            ),
            centered: true,
            labels: {
                confirm: intl.formatMessage({
                    id: 'pages.roles.details.settings.remove.confirmmodal.confirm',
                }),
                cancel: intl.formatMessage({
                    id: 'pages.roles.details.settings.remove.confirmmodal.cancel',
                }),
            },
            confirmProps: { color: 'red.8' },
            onConfirm: () => {},
        });
    };

    return (
        <Flex direction="column" gap={rem(40)}>
            <Box pos="relative">
                <LoadingOverlay visible={updating} />
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Flex direction="column" gap={rem(40)}>
                        <Grid gutter={rem(24)}>
                            <Grid.Col span={{ base: 12, lg: 8 }}>
                                <TextInput
                                    label={intl.formatMessage({
                                        id: 'pages.roles.details.settings.form.name.label',
                                    })}
                                    placeholder={intl.formatMessage({
                                        id: 'pages.roles.details.settings.form.name.placeholder',
                                    })}
                                    required
                                    {...form.getInputProps('name')}
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, lg: 8 }}>
                                <Textarea
                                    label={intl.formatMessage({
                                        id: 'pages.roles.details.settings.form.description.label',
                                    })}
                                    placeholder={intl.formatMessage({
                                        id: 'pages.roles.details.settings.form.description.placeholder',
                                    })}
                                    rows={3}
                                    required
                                    {...form.getInputProps('description')}
                                />
                            </Grid.Col>
                        </Grid>
                        <Box>
                            <Button type="submit">
                                <FormattedMessage id="pages.roles.details.settings.form.save" />
                            </Button>
                        </Box>
                    </Flex>
                </form>
            </Box>

            <Flex gap={rem(16)} direction="column">
                <h2 className="text-xl font-medium">
                    <FormattedMessage id="pages.roles.details.settings.dangerzone.title" />
                </h2>
                <div className="flex items-center p-6 rounded text-[rgb(118,28,23)] bg-[rgb(251,238,237)]">
                    <div className="flex-1 grid grid-cols-1 gap-1">
                        <h6 className="text-sm font-medium leading-6">
                            <FormattedMessage id="pages.roles.details.settings.dangerzone.delete.title" />
                        </h6>
                        <p className="text-xs leading-6">
                            <FormattedMessage id="pages.roles.details.settings.dangerzone.delete.content" />
                        </p>
                    </div>
                    <div>
                        <Button variant="filled" color="red.9" onClick={handleDelete}>
                            <FormattedMessage id="pages.roles.details.settings.dangerzone.delete.button" />
                        </Button>
                    </div>
                </div>
            </Flex>
        </Flex>
    );
};

export default RoleSettings;
