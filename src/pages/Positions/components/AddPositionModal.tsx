import { CreatePositionModel } from '@/@types/position';
import { Button, CloseButton, Modal, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormattedMessage } from 'umi';

interface AddPositionFormProps {
    loading?: boolean;
    onCancel: () => void;
    onSubmit: (values: CreatePositionModel) => void;
}

const Form: React.FC<AddPositionFormProps> = ({ loading = false, onCancel, onSubmit }) => {
    const form = useForm<CreatePositionModel>({
        mode: 'uncontrolled',
    });
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-y-6">
                <TextInput
                    disabled={loading}
                    data-autofocus
                    label={'Name'}
                    placeholder="Enter position name"
                    required
                    {...form.getInputProps('name')}
                />
                <Textarea
                    disabled={loading}
                    label="Description"
                    placeholder="Enter position description"
                    rows={3}
                    {...form.getInputProps('description')}
                />

                <div className="flex items-center justify-end gap-x-2">
                    <Button variant="default" onClick={onCancel} disabled={loading}>
                        <FormattedMessage id="common.cancel" />
                    </Button>
                    <Button type="submit" loading={loading}>
                        <FormattedMessage id="pages.positions.add.addposition" />
                    </Button>
                </div>
            </div>
        </form>
    );
};

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
                <Form loading={loading} onCancel={onClose} onSubmit={onAdd} />
            </Modal.Body>
        </Modal>
    );
};

export default AddPositionModal;
