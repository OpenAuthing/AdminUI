import StrongPasswordInput from '@/components/StrongPasswordInput';
import { generate, validate } from '@/lib/password';
import { Box, Button, CloseButton, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface CreateUserDialogProps {
    opened: boolean;
    onClose: () => void;
    onCreate?: (data: FormValues) => void;
}

type FormValues = {
    nickname?: string;
    username?: string;
    password?: string;
};

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
    opened,
    onClose,
    onCreate,
    ...others
}) => {
    const form = useForm<FormValues>({
        initialValues: {
            nickname: '',
            username: '',
            password: '',
        },
        validate: {
            password: validate,
        },
    });

    const handleClose = () => {
        onClose();
    };

    const handleCreate = (value: any) => {
        console.log('submit', value);
    };

    const generatePassword = () => {
        const password = generate(12);
        form.setFieldValue('password', password);
    };

    return (
        <Modal size="40rem" withCloseButton={false} opened={opened} onClose={handleClose} centered>
            <Box pos="relative">
                <Modal.Header mih={0} p="30px 30px 24px">
                    <h1 className="text-xl font-medium">Create user</h1>
                    <CloseButton onClick={handleClose} />
                </Modal.Header>
                <Modal.Body p="4px 30px">
                    <form onSubmit={form.onSubmit(handleCreate)}>
                        <div className="grid grid-cols-1 gap-y-6">
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
                            <div className="grid grid-cols-[1fr_max-content] items-end gap-1">
                                <StrongPasswordInput
                                    passwordInputProps={{
                                        label: 'Password',
                                        required: true,
                                        placeholder: '************',
                                        ...form.getInputProps('password'),
                                    }}
                                    rightSection={undefined}
                                />
                                <Button size="sm" variant="outline" onClick={generatePassword}>
                                    Generate
                                </Button>
                            </div>
                        </div>
                        <div className="pb-5 pt-6 flex items-center justify-end gap-x-2">
                            <Button variant="default" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit">Create</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Box>
        </Modal>
    );
};

export default CreateUserDialog;
