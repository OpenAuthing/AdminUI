import { CreateRoleReq } from '@/@types/role';
import {
    Button,
    CloseButton,
    Flex,
    LoadingOverlay,
    Modal,
    TextInput,
    Textarea,
    rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';

type CreateRoleFormValues = {
    name: string;
    description: string;
};

interface CreateRoleFormProps {
    onCancel: () => void;
    onSubmit: (values: CreateRoleFormValues) => void;
}

const CreateRoleForm: React.FC<CreateRoleFormProps> = ({ onCancel, onSubmit }) => {
    const form = useForm<CreateRoleFormValues>({
        mode: 'uncontrolled',
        validate: {},
    });

    const handleSubmit = (values: CreateRoleFormValues) => {
        console.log('submit', values);

        onSubmit(values);
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex direction="column" gap={rem(24)}>
                <TextInput
                    data-autofocus
                    label={'Name'}
                    placeholder="Enter role name"
                    required
                    {...form.getInputProps('name')}
                />
                <Textarea
                    label={'Description'}
                    placeholder="Enter role description"
                    rows={2}
                    required
                    {...form.getInputProps('description')}
                />
                <Flex justify="flex-end" align="center" py={rem(4)} gap={rem(8)}>
                    <Button variant="default" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit">Create</Button>
                </Flex>
            </Flex>
        </form>
    );
};

interface CreateRoleModalProps {
    opened: boolean;
    creating?: boolean;
    onClose: () => void;
    onCreate?: (data: CreateRoleReq) => void;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({
    opened,
    creating,
    onClose,
    onCreate,
}) => {
    const handleCreate = (values: CreateRoleFormValues) => {
        onCreate && onCreate(values as CreateRoleReq);
    };

    return (
        <Modal size="40rem" withCloseButton={false} opened={opened} onClose={onClose} centered>
            <Modal.Header>
                <h1 className="text-xl font-medium">New Role</h1>
                <CloseButton onClick={onClose} />
            </Modal.Header>
            <Modal.Body pos="relative">
                <LoadingOverlay visible={creating} />
                <CreateRoleForm onCancel={onClose} onSubmit={handleCreate} />
            </Modal.Body>
        </Modal>
    );
};

export default CreateRoleModal;
