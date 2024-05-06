import StrongPasswordInput from '@/components/StrongPasswordInput';
import { generate, validate } from '@/lib/password';
import {
    Button,
    Chip,
    Flex,
    Grid,
    Input,
    Text,
    TextInput,
    UnstyledButton,
    rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { CheckIcon } from 'lucide-react';
import { useId } from 'react';

type CreateUserFormValues = {
    nickname: string;
    username: string;
    password: string;
    phoneNumber: string;
};

interface CreateUserFormProps {
    onCancel: () => void;
    onSubmit: (values: CreateUserFormValues) => Promise<void>;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onSubmit, onCancel }) => {
    const pwdId = useId();
    const emailInputId = useId();
    const form = useForm<CreateUserFormValues>({
        mode: 'controlled',
        initialValues: {
            nickname: '',
            username: '',
            password: '',
            phoneNumber: '',
        },
        validate: {
            password: validate,
        },
    });

    const generatePassword = () => {
        const password = generate(12);
        form.setFieldValue('password', password, { forceUpdate: true });
    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Grid gutter={rem(24)}>
                <Grid.Col span={6}>
                    <Flex direction="column" rowGap={rem(24)}>
                        <TextInput
                            data-autofocus
                            label={'Nickname'}
                            placeholder="e.g. John Doe"
                            {...form.getInputProps('nickname')}
                        />
                        <TextInput
                            data-autofocus
                            label={'Username'}
                            placeholder="e.g. johndoe"
                            autoComplete="off"
                            required
                            {...form.getInputProps('username')}
                        />
                        <Input.Wrapper>
                            <Flex justify="space-between" w="100%">
                                <Input.Label required htmlFor={pwdId}>
                                    Password
                                </Input.Label>
                                <UnstyledButton tabIndex={-1} onClick={generatePassword}>
                                    <Text c="gray.7" size="xs">
                                        Generate
                                    </Text>
                                </UnstyledButton>
                            </Flex>
                            <StrongPasswordInput
                                passwordInputProps={{
                                    id: pwdId,
                                    required: true,
                                    placeholder: '************',
                                    withAsterisk: false,
                                    ...form.getInputProps('password'),
                                }}
                                rightSection={undefined}
                            />
                        </Input.Wrapper>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Flex direction="column" rowGap={rem(24)}>
                        <Input.Wrapper>
                            <Flex justify="space-between">
                                <Input.Label required htmlFor={emailInputId}>
                                    Email
                                </Input.Label>
                                <Chip
                                    size="xs"
                                    icon={<CheckIcon className="size-4" />}
                                    variant="light"
                                    defaultChecked
                                >
                                    Verified
                                </Chip>
                            </Flex>
                            <TextInput
                                id={emailInputId}
                                type="number"
                                placeholder="e.g. 13000000000"
                                required
                                {...form.getInputProps('phoneNumber')}
                            />
                        </Input.Wrapper>
                    </Flex>
                </Grid.Col>
            </Grid>
            <div className="pb-5 pt-8 flex items-center justify-end gap-x-2">
                <Button variant="default" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">Create</Button>
            </div>
        </form>
    );
};

export { CreateUserForm, CreateUserFormProps, CreateUserFormValues };
