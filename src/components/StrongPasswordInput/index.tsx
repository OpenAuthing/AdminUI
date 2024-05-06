import { getStrength, Requirements } from '@/lib/password';
import {
    Box,
    CheckIcon,
    PasswordInput,
    PasswordInputProps,
    Popover,
    Progress,
    Text,
} from '@mantine/core';
import { XIcon } from 'lucide-react';
import { useState } from 'react';

const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => {
    return (
        <Box
            c={meets ? 'teal' : 'red'}
            style={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size="sm"
        >
            {meets ? <CheckIcon className="size-4" /> : <XIcon className="size-4" />}{' '}
            <Text ml={10} size="sm">
                {label}
            </Text>
        </Box>
    );
};

interface StrongPasswordInputProps {
    passwordInputProps?: PasswordInputProps;
    rightSection?: React.ReactNode;
}

const StrongPasswordInput: React.FC<StrongPasswordInputProps> = (props) => {
    const [popoverOpened, setPopoverOpened] = useState(false);

    const { passwordInputProps, ...others } = props;

    const password = (passwordInputProps?.value ?? '') as string;

    const strength = getStrength(password);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    const checks = Requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(password)}
        />
    ));

    return (
        <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transitionProps={{ transition: 'pop' }}
        >
            <Popover.Target>
                <div
                    className="grid grid-cols-[1fr_max-content]"
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                >
                    <PasswordInput
                        withAsterisk
                        autoComplete="new-password"
                        placeholder="Your password"
                        value={password}
                        {...passwordInputProps}
                    />
                </div>
            </Popover.Target>
            <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb="xs" />
                <PasswordRequirement
                    label="Includes at least 6 characters"
                    meets={password.length > 5}
                />
                {checks}
            </Popover.Dropdown>
        </Popover>
    );
};

export default StrongPasswordInput;
