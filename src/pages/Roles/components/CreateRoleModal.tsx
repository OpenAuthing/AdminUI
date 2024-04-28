import { Button, CloseButton, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface CreateRoleModalProps {
    opened: boolean;
    onClose: () => void;
    onCreate?: (data: any) => void;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({
    opened,
    onClose,
    onCreate,
    ...others
}) => {
    const form = useForm({});

    const handleCreate = (value: any) => {};

    return (
        <Modal
            size="40rem"
            withCloseButton={false}
            opened={opened}
            onClose={onClose}
            centered
        >
            <Modal.Header
                mih={0}
                p="30px 30px 24px"
            >
                <h1 className="text-xl font-medium">New Role</h1>
                <CloseButton onClick={onClose} />
            </Modal.Header>
            <Modal.Body p="4px 30px">
                <form onSubmit={form.onSubmit(handleCreate)}>
                    <div className="grid grid-cols-1 gap-y-6">
                        <TextInput
                            data-autofocus
                            label={'Name'}
                            required
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            data-autofocus
                            label={'Description'}
                            required
                            {...form.getInputProps('name')}
                        />
                    </div>
                    <div className="pb-5 pt-6 flex items-center justify-end gap-x-2">
                        <Button
                            variant="default"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateRoleModal;
