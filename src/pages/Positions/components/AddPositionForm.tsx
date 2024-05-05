import { CreatePositionModel } from '@/@types/position';
import { Button, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormattedMessage } from 'umi';

interface AddPositionFormProps {
    loading?: boolean;
    onCancel: () => void;
    onSubmit: (values: CreatePositionModel) => void;
}

const AddPositionForm: React.FC<AddPositionFormProps> = ({
    loading = false,
    onCancel,
    onSubmit,
}) => {
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

export { AddPositionForm, AddPositionFormProps };
