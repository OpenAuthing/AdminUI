import { CreatePositionModel } from '@/@types/position';
import { CloseButton, Modal } from '@mantine/core';
import { AddPositionForm } from './AddPositionForm';

interface AddPositionModalProps {
    opened: boolean;
    onClose: () => void;
    onAdd: (values: CreatePositionModel) => void;
    loading?: boolean;
}

const AddPositionModal: React.FC<AddPositionModalProps> = ({ opened, loading, onClose, onAdd }) => {
    return (
        <Modal size="35rem" opened={opened} onClose={onClose} withCloseButton={false} centered>
            <Modal.Header>
                <h1 className="text-xl font-medium">Add Position</h1>
                <CloseButton onClick={onClose} />
            </Modal.Header>
            <Modal.Body>
                <AddPositionForm loading={loading} onCancel={onClose} onSubmit={onAdd} />
            </Modal.Body>
        </Modal>
    );
};

export default AddPositionModal;
