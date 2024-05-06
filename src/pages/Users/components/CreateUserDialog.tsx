import { CreateUserReq } from '@/@types/user';
import { Box, CloseButton, LoadingOverlay, Modal } from '@mantine/core';
import { CreateUserForm, CreateUserFormValues } from './CreateUserForm';

interface CreateUserDialogProps {
    opened: boolean;
    loading?: boolean;
    onClose: () => void;
    onCreate: (data: CreateUserReq) => Promise<void>;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
    opened,
    loading,
    onClose,
    onCreate,
}) => {
    const handleClose = () => {
        onClose();
    };

    const handleSubmit = async (values: CreateUserFormValues) => {
        await onCreate({ ...values });
    };

    return (
        <Modal size="55rem" withCloseButton={false} opened={opened} onClose={handleClose} centered>
            <Box pos="relative">
                <LoadingOverlay visible={loading} />
                <Modal.Header mih={0} p="30px 30px 24px">
                    <h1 className="text-xl font-medium">Create User</h1>
                    <CloseButton onClick={handleClose} />
                </Modal.Header>
                <Modal.Body p="4px 30px">
                    <CreateUserForm onCancel={onClose} onSubmit={handleSubmit} />
                </Modal.Body>
            </Box>
        </Modal>
    );
};

export default CreateUserDialog;
