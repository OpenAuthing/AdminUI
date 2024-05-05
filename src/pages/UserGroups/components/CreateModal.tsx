import { CreateUserGroupReq } from '@/@types/usergroup';
import { CloseButton, LoadingOverlay, Modal } from '@mantine/core';
import { FormattedMessage } from 'umi';
import { CreateUserGroupForm, CreateUserGroupFormValues } from './CreateForm';

interface CreateUserGroupModalProps {
    opened: boolean;
    creating?: boolean;
    onClose: () => void;
    onCreate: (values: CreateUserGroupReq) => Promise<void>;
}

const CreateUserGroupModal: React.FC<CreateUserGroupModalProps> = ({
    opened,
    creating = false,
    onClose,
    onCreate,
}) => {
    const handleSubmit = (values: CreateUserGroupFormValues) => {
        onCreate({ ...values });
    };

    return (
        <Modal size="40rem" centered withCloseButton={false} opened={opened} onClose={onClose}>
            <Modal.Header>
                <h1 className="text-xl font-medium">
                    <FormattedMessage id="pages.usergroups.create.title" />
                </h1>
                <CloseButton onClick={onClose} />
            </Modal.Header>
            <Modal.Body pos="relative">
                <LoadingOverlay visible={creating} />

                <CreateUserGroupForm onSubmit={handleSubmit} />
            </Modal.Body>
        </Modal>
    );
};

export { CreateUserGroupModal, CreateUserGroupModalProps };
