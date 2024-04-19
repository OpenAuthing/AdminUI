import { UnstyledButton } from "@mantine/core"
import { LogoIcon, LogoText } from "../Logo"
import { GithubIcon } from "lucide-react"

export default () => {
    return (
        <div className="flex items-center h-14 px-4 bg-slate-950 shadow">
            <div className="mr-auto flex gap-x-2 items-center">
                <UnstyledButton
                    component="a"
                    className="p-1 transition-colors hover:bg-gray-600/50 rounded"
                    href="/">
                    <LogoIcon className="size-8 fill-primary-600" />
                </UnstyledButton>
                <div className="mx-1 h-6 w-[1.5px] bg-gray-500"></div>
                <LogoText className="w-38 fill-primary-600" />
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