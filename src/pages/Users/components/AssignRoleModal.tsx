import { RoleService } from '@/services';
import {
    Button,
    CloseButton,
    ComboboxItem,
    Flex,
    Group,
    LoadingOverlay,
    Modal,
    MultiSelect,
    MultiSelectProps,
    Text,
    rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRequest } from 'umi';

type AssignFormValues = {
    roleIds: Array<string>;
};

type RoleOptionItem = { description?: string } & ComboboxItem;

interface AssignFormProps {
    assigning?: boolean;
    roleOptions: Array<RoleOptionItem>;
    onSubmit?: (values: string[]) => void;
}

const AssignForm: React.FC<AssignFormProps> = ({ assigning = false, roleOptions, onSubmit }) => {
    const form = useForm<AssignFormValues>({
        initialValues: {
            roleIds: [],
        },
        validate: {
            roleIds: (value) => {
                if (value.length === 0) {
                    return 'Please select at least one role';
                }
            },
        },
    });

    const handleSubmit = (values: AssignFormValues) => {
        onSubmit && onSubmit(values.roleIds);
    };

    const renderRoleOption: MultiSelectProps['renderOption'] = ({ option, checked }) => {
        const role = roleOptions.find((r) => r.value === option.value)!;
        return (
            <Group>
                <Flex direction="column" gap={rem(4)}>
                    <Text size="sm">{role.label}</Text>
                    <Text size="xs">{role.description}</Text>
                </Flex>
            </Group>
        );
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Flex gap={rem(24)} direction="column">
                <Text size="sm" c="gray.8">
                    Select roles to assign to this user. You may assign up to 50 roles per user.
                </Text>
                <MultiSelect
                    placeholder="Select Roles"
                    data={roleOptions}
                    renderOption={renderRoleOption}
                    nothingFoundMessage={'No roles available'}
                    hidePickedOptions
                    searchable
                    {...form.getInputProps('roleIds')}
                />
                <Flex justify="end" py={rem(4)}>
                    <Button type="submit" disabled={!form.isValid('roleIds')}>
                        Assign
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};

interface AssignRoleModal {
    assigning?: boolean;
    opened: boolean;
    exludeRoles?: Array<string>;
    onClose: () => void;
    onSubmit?: (values: any) => void;
}

const AssignRoleModal: React.FC<AssignRoleModal> = ({
    assigning,
    opened,
    exludeRoles = [],
    onClose,
    onSubmit,
}) => {
    const { data, loading } = useRequest(RoleService.getRoles, {
        defaultParams: [
            {
                current: 1,
                pageSize: 100,
            },
        ],
        ready: opened,
    });
    const roleOptions =
        (data?.items
            ?.filter((x: any) => exludeRoles.includes(x.id))
            .map((role: any) => ({
                value: role.id,
                label: role.name,
                description: role.description,
            })) as undefined | Array<RoleOptionItem>) ?? [];

    return (
        <Modal size="40rem" centered opened={opened} onClose={onClose} withCloseButton={false}>
            <Modal.Header>
                <h1 className="text-xl font-medium">Assign Roles</h1>
                <CloseButton onClick={onClose} />
            </Modal.Header>
            <Modal.Body pos="relative">
                <LoadingOverlay visible={loading} />
                <AssignForm assigning={assigning} onSubmit={onSubmit} roleOptions={roleOptions} />
            </Modal.Body>
        </Modal>
    );
};

export default AssignRoleModal;
