import { AddMembersReq } from '@/@types/usergroup';
import { CloseButton, LoadingOverlay, Modal } from '@mantine/core';
import { FormattedMessage } from 'umi';
import { AddMembersForm, AddMembersFormValues } from './AddMembersForm';

interface AddMembersModalProps {
    opened: boolean;
    onClose: () => void;
    onAdd: (req: AddMembersReq) => void;
}

const AddMembersModal: React.FC<AddMembersModalProps> = ({ opened, onClose, onAdd }) => {
    const handleSubmit = async (values: AddMembersFormValues) => {};

    return (
        <Modal size="50rem" opened={opened} onClose={onClose} centered withCloseButton={false}>
            <Modal.Header>
                <h1 className="text-xl font-medium">
                    <FormattedMessage id="pages.usergroups.details.members.addmodal.title" />
                </h1>
                <CloseButton onClick={onClose} />
            </Modal.Header>
            <Modal.Body pos="relative">
                <LoadingOverlay visible={true} />

                <AddMembersForm onCancel={onClose} onSubmit={handleSubmit} />
            </Modal.Body>
        </Modal>
    );
};

export { AddMembersModal, AddMembersModalProps };
