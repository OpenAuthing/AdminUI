import { Button, Fieldset, Kbd, Text, TextInput, CopyButton, Tooltip, ActionIcon, PasswordInput, Textarea, Divider, Select } from "@mantine/core"
import { useForm } from "@mantine/form";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { CopyIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useIntl } from "umi";

const ApplicationTypes = [
    { value: 'non_interactive', label: 'Machine to Machine' },
    { value: 'native', label: 'Native' },
    { value: 'regular_web', label: 'Regular Web Application' },
    { value: 'spa', label: 'Single Page Application' },
]

const Copy = ({ value }: { value?: any }) => {
    const intl = useIntl()
    return (
        <CopyButton value={value} timeout={2000}>
            {({ copied, copy }) => (
                <Tooltip label={intl.formatMessage({ id: copied ? "common.copied" : "common.copy" })} withArrow position="top">
                    <ActionIcon className="text-gray-700" variant="subtle" onClick={copy}>
                        <CopyIcon className="size-4" />
                    </ActionIcon>
                </Tooltip>
            )}
        </CopyButton>
    )
}

export default () => {
    const [secretVisable, { toggle: secretVisableToggle }] = useDisclosure(false);
    const form = useForm({})
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
    }, [])

    useHotkeys([
        ["mod+Enter", (event) => {
            event.preventDefault();
            submitBtnRef?.current?.click();
        }]
    ], []);

    const handleSubmit = () => {
        console.log('submit')
    }

    return (
        <div className="grid grid-cols-1 gap-10 mb-16">
            <div className="p-8 border rounded-lg bg-white">
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
                                    required={true}
                                    rightSection={<Copy value={"name"} />} />
                                <TextInput
                                    label="Client ID"
                                    disabled={true}
                                    rightSection={<Copy value={"clientid"} />} />
                                <PasswordInput
                                    label="Client Secret"
                                    disabled={true}
                                    visible={secretVisable}
                                    rightSectionWidth={64}
                                    rightSection={(
                                        <div className="flex gap-x-0.5 items-center">
                                            <ActionIcon className="text-gray-700" variant="subtle" onClick={secretVisableToggle}>
                                                {secretVisable ? (
                                                    <EyeOffIcon style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
                                                ) : (
                                                    <EyeIcon style={{ width: 'var(--psi-icon-size)', height: 'var(--psi-icon-size)' }} />
                                                )}
                                            </ActionIcon>
                                            <Copy value={"clientsecret"} />
                                        </div>
                                    )}
                                />
                                <Textarea
                                    label="Description"
                                    description="A free text description of the application. Max character count is 140."
                                    placeholder="Add a description in less than 140 characters"
                                    rows={5}
                                    maxLength={140} />

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
                                <Select label="Application Type"
                                    defaultValue={ApplicationTypes[0].value}
                                    data={ApplicationTypes} />
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
                                <TextInput label="Login URL"
                                    description=""
                                    placeholder="https://myapp.cc/login" />
                            </div>
                        </fieldset>

                    </div>
                    <div className="fixed left-0 right-0 bottom-0 bg-white h-16 flex justify-end z-10" >
                        <div className="border-t w-[calc(100%-264px)] flex items-center justify-center">
                            <div className="flex justify-between items-center w-5/6 h-full">
                                <div className="flex items-center gap-x-3">
                                    <Text size="sm" c="gray.6" fw={500}>Showing 1-10 of 100</Text>
                                    <div>
                                        <Kbd>CTRL</Kbd>+<Kbd>Enter</Kbd>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Button variant="transparent" c="gray.7">
                                        Cancel
                                    </Button>
                                    <Button type="submit" ref={submitBtnRef}>Save Changes</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
            <div className="grid grid-cols-1 gap-4">
                <h2 className="text-xl font-medium">Danger Zone</h2>
                <div className="grid grid-cols-1 gap-2.5">
                    <div className="flex items-center p-6 rounded text-[rgb(118,28,23)] bg-[rgb(251,238,237)]">
                        <div className="flex-1 grid grid-cols-1 gap-1">
                            <h6 className="text-sm font-medium leading-6">Delete this application</h6>
                            <p className="text-sm leading-6">All your apps using this client will stop working.</p>
                        </div>
                        <div>
                            <Button variant="filled" color="red.9">Delete</Button>
                        </div>
                    </div>
                    <div className="flex items-center p-6 rounded text-[rgb(118,28,23)] bg-[rgb(251,238,237)]">
                        <div className="flex-1 grid grid-cols-1 gap-1">
                            <h6 className="text-sm font-medium leading-6">Rotate secret</h6>
                            <p className="text-sm leading-6">All authorized apps will need to be updated with the new client secret.</p>
                        </div>
                        <div>
                            <Button variant="filled" color="red.9">Rotate</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}