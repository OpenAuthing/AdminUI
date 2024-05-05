import { Button, Flex, TextInput, Textarea, rem } from '@mantine/core';
import { useForm } from '@mantine/form';

type CreateUserGroupFormValues = {
    name: string;
    description: string;
};

interface CreateUserGroupFormProps {
    onSubmit: (values: CreateUserGroupFormValues) => void;
}

const CreateUserGroupForm: React.FC<CreateUserGroupFormProps> = ({ onSubmit }) => {
    const form = useForm<CreateUserGroupFormValues>({
        mode: 'uncontrolled',
    });

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Flex direction="column" rowGap={rem(24)}>
                <TextInput
                    label="Name"
                    placeholder="Enter group name"
                    required
                    {...form.getInputProps('name')}
                />
                <Textarea
                    label="Description"
                    placeholder="Enter group description"
                    required
                    {...form.getInputProps('description')}
                />
                <Flex justify="end">
                    <Button type="submit">Create</Button>
                </Flex>
            </Flex>
        </form>
    );
};

export { CreateUserGroupForm, CreateUserGroupFormProps, CreateUserGroupFormValues };
