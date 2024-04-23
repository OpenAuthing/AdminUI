import { UnstyledButton } from "@mantine/core"
import { LogoIcon, LogoText } from "../Logo"
import { GithubIcon } from "lucide-react"

export default () => {
    return (
        <div className="flex items-center h-full">
            <div className="mr-auto flex gap-x-2 items-center">
                <UnstyledButton
                    component="a"
                    href="/">
                    <div className="flex items-center gap-x-0.5">
                        <LogoIcon className="size-8 fill-primary-500" />
                        <LogoText className="w-38 fill-primary-500" />
                    </div>
                </UnstyledButton>

            </div>
            <div className="ml-auto flex items-center gap-x-4">
                <UnstyledButton component="a"
                    href="https://github.com/BeniceSoft/OpenAuthing"
                    target="_blank"
                    className="size-9 p-2 rounded transition-colors hover:bg-gray-600/50">
                    <GithubIcon className="size-5 stroke-gray-400" />
                </UnstyledButton>
            </div>
        </div>
    )
}