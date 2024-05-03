import {
    ActionIcon,
    Button,
    CopyButton,
    Divider,
    Input,
    Kbd,
    PasswordInput,
    Select,
    Text,
    TextInput,
    Textarea,
    Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import { CopyIcon, EyeIcon, EyeOffIcon, LinkIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useIntl } from 'umi';

const ApplicationTypes = [
    { value: 'non_interactive', label: 'Machine to Machine' },
    { value: 'native', label: 'Native' },
    { value: 'regular_web', label: 'Regular Web Application' },
    { value: 'spa', label: 'Single Page Application' },
];

const Copy = ({ value }: { value?: any }) => {
    const intl = useIntl();
    return (
        <CopyButton value={value} timeout={2000}>
            {({ copied, copy }) => (
                <Tooltip
                    label={intl.formatMessage({
                        id: copied ? 'common.copied' : 'common.copy',
                    })}
                    withArrow
                    position="top"
                >
                    <ActionIcon className="text-gray-700" variant="subtle" onClick={copy}>
                        <CopyIcon className="size-4" />
                    </ActionIcon>
                </Tooltip>
            )}
        </CopyButton>
    );
};

export default () => {
    const [secretVisable, { toggle: secretVisableToggle }] = useDisclosure(false);
    const form = useForm({});
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {}, []);

    useHotkeys(
        [
            [
                'mod+Enter',
                (event) => {
                    event.preventDefault();
                    submitBtnRef?.current?.click();
                },
            ],
        ],
        [],
    );

    const handleSubmit = () => {
        console.log('submit');
    };

    return (
        <div className="grid grid-cols-1 gap-10 mb-16">
            <div className="p-8 border rounded-lg">
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <div className="grid grid-cols-1 gap-10">
                        <fieldset className="grid items-start border-none grid-cols-1 gap-6 lg:gap-10 lg:grid-cols-[2fr_minmax(0px,3fr)]">
                            <div>
                                <legend className="text-base font-medium text-gray-800">
                                    Basic Information
                                </legend>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <TextInput
                                    label="Name"
                                    placeholder="Enter name for application"
                                    required={true}
                                    rightSection={<Copy value={'name'} />}
                                />
                                <TextInput
                                    label="Client ID"
                                    disabled={true}
                                    rightSection={<Copy value={'clientid'} />}
                                />
                                <PasswordInput
                                    label="Client Secret"
                                    disabled={true}
                                    visible={secretVisable}
                                    rightSectionWidth={64}
                                    rightSection={
                                        <div className="flex gap-x-0.5 items-center">
                                            <ActionIcon
                                                className="text-gray-700"
                                                variant="subtle"
                                                onClick={secretVisableToggle}
                                            >
                                                {secretVisable ? (
                                                    <EyeOffIcon
                                                        style={{
                                                            width: 'var(--psi-icon-size)',
                                                            height: 'var(--psi-icon-size)',
                                                        }}
                                                    />
                                                ) : (
                                                    <EyeIcon
                                                        style={{
                                                            width: 'var(--psi-icon-size)',
                                                            height: 'var(--psi-icon-size)',
                                                        }}
                                                    />
                                                )}
                                            </ActionIcon>
                                            <Copy value={'clientsecret'} />
                                        </div>
                                    }
                                />
                                <Textarea
                                    label="Description"
                                    description="A free text description of the application. Max character count is 140."
                                    placeholder="Add a description in less than 140 characters"
                                    rows={5}
                                    maxLength={140}
                                />
                            </div>
                        </fieldset>

                        <Divider my="md" />

                        <fieldset className="grid items-start border-none grid-cols-1 gap-6 lg:gap-10 lg:grid-cols-[2fr_minmax(0px,3fr)]">
                            <div>
                                <legend className="text-base font-medium text-gray-800">
                                    Endpoint Information
                                </legend>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <TextInput
                                    label="Issuer"
                                    disabled={true}
                                    value={'https://dgdfefdfe.authing.cn/oidc'}
                                    rightSection={
                                        <Copy value={'https://dgdfefdfe.authing.cn/oidc'} />
                                    }
                                />
                                <TextInput
                                    label="Token Endpoint"
                                    disabled={true}
                                    value={'https://dgdfefdfe.authing.cn/oidc/token'}
                                    rightSection={
                                        <Copy value={'https://dgdfefdfe.authing.cn/oidc/token'} />
                                    }
                                />
                                <TextInput
                                    label="User Information Endpoint"
                                    disabled={true}
                                    value={'https://dgdfefdfe.authing.cn/oidc/me'}
                                    rightSection={
                                        <Copy value={'https://dgdfefdfe.authing.cn/oidc/me'} />
                                    }
                                />
                                <TextInput
                                    label="User Information Endpoint"
                                    disabled={true}
                                    value={'https://dgdfefdfe.authing.cn/oidc/me'}
                                    rightSection={
                                        <Copy value={'https://dgdfefdfe.authing.cn/oidc/me'} />
                                    }
                                />
                                <TextInput
                                    label="OpenID Configuration"
                                    disabled={true}
                                    value={
                                        'https://dgdfefdfe.authing.cn/oidc/.well-known/openid-configuration'
                                    }
                                    rightSection={
                                        <Copy
                                            value={
                                                'https://dgdfefdfe.authing.cn/oidc/.well-known/openid-configuration'
                                            }
                                        />
                                    }
                                />
                                <TextInput
                                    label="OpenID Configuration"
                                    disabled={true}
                                    value={
                                        'https://dgdfefdfe.authing.cn/oidc/.well-known/jwks.json'
                                    }
                                    rightSection={
                                        <Copy
                                            value={
                                                'https://dgdfefdfe.authing.cn/oidc/.well-known/jwks.json'
                                            }
                                        />
                                    }
                                />
                            </div>
                        </fieldset>

                        <Divider my="md" />

                        <fieldset className="grid items-start border-none grid-cols-1 gap-6 lg:gap-10 lg:grid-cols-[2fr_minmax(0px,3fr)]">
                            <div>
                                <legend className="text-base font-medium text-gray-800">
                                    Application Properties
                                </legend>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <Input.Wrapper
                                    label="Application Logo"
                                    description="The URL of the logo to display for the application, if none is set the default badge for this type of application will be shown. Recommended size is 150x150 pixels."
                                >
                                    <div className="grid grid-cols-1 pb-1">
                                        <div className="flex items-center justify-center h-32 border border-b-0 border-[val(--input-bd)] rounded-tl-md rounded-tr-md">
                                            <img className="h-14" src="/assets/logo.png" />
                                        </div>
                                        <TextInput
                                            classNames={{
                                                input: 'rounded-tl-none rounded-tr-none',
                                            }}
                                            leftSection={<LinkIcon className="size-4" />}
                                            placeholder="https://path.to/my_logo.png"
                                        />
                                    </div>
                                </Input.Wrapper>
                                <Select
                                    label="Application Type"
                                    disabled={true}
                                    defaultValue={ApplicationTypes[0]?.value}
                                    data={ApplicationTypes}
                                />
                            </div>
                        </fieldset>

                        <Divider my="md" />

                        <fieldset className="grid items-start border-none grid-cols-1 gap-6 lg:gap-10 lg:grid-cols-[2fr_minmax(0px,3fr)]">
                            <div>
                                <legend className="text-base font-medium text-gray-800">
                                    Application URIs
                                </legend>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <TextInput
                                    label="Login URL"
                                    description=""
                                    placeholder="https://myapp.cc/login"
                                />
                                <Textarea
                                    label="Allowed Callback URLs"
                                    description=""
                                    placeholder="Separate multiple URLs with a comma."
                                    rows={3}
                                />
                                <Textarea
                                    label="Allowed Logout URLs"
                                    description=""
                                    placeholder="Separate multiple URLs with a comma."
                                    rows={3}
                                />
                            </div>
                        </fieldset>
                    </div>
                    <div className="fixed left-0 right-0 bottom-0 bg-white h-16 flex justify-end z-10">
                        <div className="border-t w-[calc(100%-var(--app-shell-navbar-width))] flex items-center justify-center">
                            <div className="flex justify-between px-10 items-center 2xl:px-0 2xl:w-5/6 w-full h-full">
                                <div className="flex items-center gap-x-3">
                                    <Text size="sm" c="gray.6" fw={500}>
                                        Save changes
                                    </Text>
                                    <div>
                                        <Kbd>CTRL</Kbd>+<Kbd>Enter</Kbd>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Button variant="transparent" c="gray.7">
                                        Cancel
                                    </Button>
                                    <Button type="submit" ref={submitBtnRef}>
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <h2 className="text-xl font-medium">Danger Zone</h2>
                <div className="grid grid-cols-1 gap-2.5">
                    <div className="flex items-center p-6 rounded text-[rgb(118,28,23)] bg-[rgb(251,238,237)]">
                        <div className="flex-1 grid grid-cols-1 gap-1">
                            <h6 className="text-sm font-medium leading-6">
                                Delete this application
                            </h6>
                            <p className="text-sm leading-6">
                                All your apps using this client will stop working.
                            </p>
                        </div>
                        <div>
                            <Button variant="filled" color="red.9">
                                Delete
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center p-6 rounded text-[rgb(118,28,23)] bg-[rgb(251,238,237)]">
                        <div className="flex-1 grid grid-cols-1 gap-1">
                            <h6 className="text-sm font-medium leading-6">Rotate secret</h6>
                            <p className="text-sm leading-6">
                                All authorized apps will need to be updated with the new client
                                secret.
                            </p>
                        </div>
                        <div>
                            <Button variant="filled" color="red.9">
                                Rotate
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
