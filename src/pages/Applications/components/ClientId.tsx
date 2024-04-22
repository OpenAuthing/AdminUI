import { ActionIcon, CopyButton, Tooltip } from "@mantine/core"
import { CopyIcon, CheckIcon } from "lucide-react"
import { useIntl } from "umi"

type Props = {
    value: string
}

export default ({ value }: Props) => {
    const intl = useIntl()

    return (
        <div className="grid grid-cols-[max-content_auto] items-center justify-start gap-x-2">
            <span className="text-gray-500 font-medium text-sm">Client Id:</span>
            <div className="flex gap-x-1 items-center justify-center">
                <span className="text-xs bg-gray-200/80 text-gray-500 rounded px-2 py-1">
                    {value}
                </span>
                <CopyButton value={value} timeout={2000}>
                    {({ copied, copy }) => (
                        <Tooltip label={intl.formatMessage({ id: copied ? "common.copied" : "common.copy" })} withArrow position="top">
                            <ActionIcon className={copied ? "text-teal-500" : "text-gray-700"} variant="subtle" onClick={copy}>
                                {copied ? (
                                    <CheckIcon className="size-4" />
                                ) : (
                                    <CopyIcon className="size-4" />
                                )}
                            </ActionIcon>
                        </Tooltip>
                    )}
                </CopyButton>
            </div>
        </div>
    )
}