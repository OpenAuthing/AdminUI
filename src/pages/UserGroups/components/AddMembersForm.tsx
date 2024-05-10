import { Button } from '@mantine/core';
import { FormattedMessage } from 'umi';

type AddMembersFormValues = {};

interface AddMembersFormProps {
    onCancel: () => void;
    onSubmit: (values: AddMembersFormValues) => Promise<void>;
}

const AddMembersForm: React.FC<AddMembersFormProps> = () => {
    return (
        <form>
            <Button>
                <FormattedMessage id="pages.usergroups.details.members.addmodal.add" />
            </Button>
        </form>
    );
};

export { AddMembersForm, AddMembersFormProps, AddMembersFormValues };
