import { CloseButton, LoadingOverlay, Modal } from '@mantine/core';

interface AddSubjectFormProps {}

const AddSubjectForm: React.FC<AddSubjectFormProps> = () => {
    return <form></form>;
};

interface AddSubjectModalProps {
    opened: boolean;
    onClose: () => void;
    onAdd?: (subject: string) => void;
}

const AddSubjectModal: React.FC<AddSubjectModalProps> = ({ opened, onClose, onAdd }) => {
    return (
        <Modal size="55rem" opened={opened} onClose={onClose} centered withCloseButton={false}>
            <Modal.Header>
                <h1 className="text-xl font-medium">Add Subjects</h1>
                <CloseButton onClick={onClose} />
            </Modal.Header>
            <Modal.Body pos="relative">
                <LoadingOverlay visible={false} />

                <AddSubjectForm />
            </Modal.Body>
        </Modal>
    );
};

export default AddSubjectModal;
