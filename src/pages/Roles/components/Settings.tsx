import { Box, Button, Flex, Grid, TextInput, Textarea, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useModel } from 'umi';
import { PropsWithRoleId } from '.';

type RoleSettingsFormValues = {
    name: string;
    description: string;
};

type RoleSettingsProps = PropsWithRoleId<{}>;

const RoleSettings: React.FC<RoleSettingsProps> = ({ roleId }) => {
    const { role } = useModel('Roles.details');
    const form = useForm<RoleSettingsFormValues>({
        mode: 'uncontrolled',
    });
    useEffect(() => {
        form.setValues(role);
    }, [role]);
    const isDisabled = () => {
        return !(form.isDirty('name') || form.isDirty('description'));
    };

    return (
        <Flex direction="column" gap={rem(40)}>
            <form>
                <Flex direction="column" gap={rem(40)}>
                    <Grid gutter={rem(24)}>
                        <Grid.Col span={{ base: 12, lg: 8 }}>
                            <TextInput label="Name" required {...form.getInputProps('name')} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 8 }}>
                            <Textarea
                                label="Description"
                                rows={3}
                                required
                                {...form.getInputProps('description')}
                            />
                        </Grid.Col>
                    </Grid>
                    <Box>
                        <Button type="submit" disabled={isDisabled()}>
                            Save
                        </Button>
                    </Box>
                </Flex>
            </form>

            <Flex gap={rem(16)} direction="column">
                <h2 className="text-xl font-medium">Danger Zone</h2>
                <div className="flex items-center p-6 rounded text-[rgb(118,28,23)] bg-[rgb(251,238,237)]">
                    <div className="flex-1 grid grid-cols-1 gap-1">
                        <h6 className="text-sm font-medium leading-6">Delete this application</h6>
                        <p className="text-sm leading-6">
                            All your apps using this client will stop working.
                        </p>
                    </div>
                    <div>
                        <Button variant="filled" color="red.9">
                            Delete This Role
                        </Button>
                    </div>
                </div>
            </Flex>
        </Flex>
    );
};

export default RoleSettings;
