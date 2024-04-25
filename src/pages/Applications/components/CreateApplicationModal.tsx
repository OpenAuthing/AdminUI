import {
    Button,
    CloseButton,
    InputLabel,
    Modal,
    Text,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import cx from 'clsx';
import { useState } from 'react';

const ApplicationTypes: Record<string, {}> = {};

type Props = {
    opened: boolean;
    onClose: () => void;
    onCreate?: (data: CreateApplicationInput) => void;
};

type CreateApplicationInput = { name?: string };

export default ({ opened, onClose, onCreate }: Props) => {
    const [current, setCurrent] = useState<number>(0);
    const form = useForm<CreateApplicationInput>({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
        },

        validate: {},
    });

    const handleCreate = (value: CreateApplicationInput) => {
        console.log(value);
        onCreate && onCreate(value);
    };

    return (
        <Modal
            size="50rem"
            withCloseButton={false}
            opened={opened}
            onClose={onClose}
            centered
        >
            <Modal.Header mih={0} p="30px 30px 24px">
                <h1 className="text-xl font-medium">Create Application</h1>

                <CloseButton onClick={onClose} />
            </Modal.Header>
            <Modal.Body p="4px 30px">
                <form onSubmit={form.onSubmit(handleCreate)}>
                    <div className="grid grid-cols-1 gap-y-6">
                        <TextInput
                            data-autofocus
                            label={'Name'}
                            description={
                                'You can change the application name later in the application settings.'
                            }
                            required
                            {...form.getInputProps('name')}
                        />
                        <div className="grid grid-cols-1 gap-y-2">
                            <InputLabel>Choose an application type</InputLabel>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px]">
                                {new Array(4).fill(0).map((_, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setCurrent(index)}
                                        aria-checked={index === current}
                                        className={cx(
                                            'border rounded p-6 cursor-pointer transition-[border-color,box-shadow] overflow-hidden ring-1 ring-transparent aria-checked:ring-primary-600 aria-checked:border-primary-500',
                                        )}
                                    >
                                        <div className="grid grid-cols-1 text-center justify-center gap-4">
                                            <div className="mx-auto size-16 bg-gray-200/80 rounded"></div>
                                            <Text
                                                component="h6"
                                                size="sm"
                                                fw={500}
                                            >
                                                Native
                                            </Text>
                                            <Text size="sm" lh={1.5}>
                                                Mobile, desktop, CLI and smart
                                                device apps running natively.
                                            </Text>
                                            <Text
                                                size="sm"
                                                lh={1.5}
                                                className="text-gray-500"
                                            >
                                                e.g.: iOS, Electron, Apple TV
                                                apps
                                            </Text>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="pb-5 pt-6 flex items-center justify-end gap-x-2">
                        <Button variant="default" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};
