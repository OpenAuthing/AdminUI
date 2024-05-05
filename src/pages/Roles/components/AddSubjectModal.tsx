import { AddRoleSubjectItem } from '@/@types/role';
import { CloseButton, LoadingOverlay, Modal } from '@mantine/core';
import React from 'react';
import { FormattedMessage } from 'umi';
import { AddSubjectForm } from './AddSubjectForm';

interface AddSubjectModalProps {
    opened: boolean;
    adding?: boolean;
    onClose: () => void;
    onAdd: (subjects: AddRoleSubjectItem[]) => Promise<void>;
}

const AddSubjectModal: React.FC<AddSubjectModalProps> = ({ opened, adding, onClose, onAdd }) => {
    return (
        <Modal size="55rem" opened={opened} onClose={onClose} centered withCloseButton={false}>
            <Modal.Header>
                <h1 className="text-xl font-medium">
                    <FormattedMessage id="pages.roles.addsubjects.title" />
                </h1>
                <CloseButton onClick={onClose} />
            </Modal.Header>
            <Modal.Body pos="relative">
                <LoadingOverlay visible={adding} />

                <AddSubjectForm onCancel={onClose} onAdd={onAdd} />
            </Modal.Body>
        </Modal>
    );
};

export default AddSubjectModal;
