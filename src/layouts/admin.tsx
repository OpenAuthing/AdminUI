import { Outlet } from "umi"
import { Avatar, Menu, ScrollArea, Select, UnstyledButton } from "@mantine/core";
import Navbar from "@/components/Navbar.tsx";
import Header from "@/components/Header";
import { ChevronRightIcon, LanguagesIcon, LogOutIcon, MonitorIcon, MoonStarIcon, SparklesIcon, SunIcon, SunMoonIcon, UserIcon } from "lucide-react";

const Themes = [
    { value: 'auto', label: 'System', icon: <MonitorIcon className="size-4 stroke-gray-600" /> },
    { value: 'light', label: 'Light', icon: <SunIcon className="size-4 stroke-gray-600" /> },
    { value: 'dark', label: 'Dark', icon: <MoonStarIcon className="size-4 stroke-gray-600" /> },
]

const AdminLayout = () => {

    return (
        <div className="h-screen flex pt-14 justify-between bg-background text-gray-800 dark:text-white dark:bg-slate-900">
            <div className="fixed z-10 top-0 left-0 right-0">
                <Header />
            </div>
            <aside className="flex flex-col flex-initial w-[264px] min-w-[264px] h-full overflow-hidden relative shadow bg-white border-r border-gray-200 dark:bg-slate-800 dark:text-white">
                <ScrollArea className="h-full px-3">
                    <Navbar />
                </ScrollArea>
                <Menu position="right-end" offset={-10} width={240}>
                    <Menu.Target>
                        <div className="group flex text-sm px-3 py-1.5 gap-x-2 items-center cursor-pointer transition-colors hover:bg-gray-50">
                            <Avatar size="md" />
                            <div className="flex flex-col gap-y-1 items-start justify-center">
                                <span className="font-medium">Ender</span>
                                <span className="text-gray-600 text-xs">zengande@outlook.com</span>
                            </div>
                            <UnstyledButton className="ml-auto">
                                <ChevronRightIcon className="size-5 stroke-gray-500 transition-all group-hover:translate-x-1 group-hover:stroke-gray-700" />
                            </UnstyledButton>
                        </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <div className="flex py-2 gap-x-2 px-3 text-sm items-center">
                            <span className="">Theme</span>
                            <Select
                                checkIconPosition="right"
                                defaultValue={'light'}
                                data={[
                                    { value: 'auto', label: 'System' },
                                    { value: 'light', label: 'Light' },
                                    { value: 'dark', label: 'Dark' },
                                ]}
                            />
                        </div>
                        <Menu position="right-end" offset={10} width={160} trigger="click-hover">
                            <Menu.Target>
                                <Menu.Item closeMenuOnClick={false}
                                    leftSection={<SunMoonIcon className="size-4 stroke-gray-600" />}
                                    rightSection={<ChevronRightIcon className="size-4 stroke-gray-600" />}>
                                    <span>Theme</span>
                                </Menu.Item>
                            </Menu.Target>
                            <Menu.Dropdown>
                                {Themes.map((theme) => (
                                    <Menu.Item leftSection={theme.icon}>
                                        <span className="text-gray-600 text-xs">{theme.label}</span>
                                    </Menu.Item>
                                ))}

                            </Menu.Dropdown>
                        </Menu>

                        <Menu position="right-end" offset={10} trigger="click-hover">
                            <Menu.Target>
                                <Menu.Item closeMenuOnClick={false}
                                    leftSection={<LanguagesIcon className="size-4 stroke-gray-600" />}
                                    rightSection={<ChevronRightIcon className="size-4 stroke-gray-600" />}>
                                    <span>Language</span>
                                </Menu.Item>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item component="a" href="/"
                                    leftSection={<UserIcon className="size-4 stroke-gray-600" />}>
                                    Your profile
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>

                        <Menu.Divider />

                        <Menu.Item component="a" href="/"
                            leftSection={<UserIcon className="size-4 stroke-gray-600" />}>
                            Your profile
                        </Menu.Item>
                        <Menu.Item component="a" href="/"
                            leftSection={<SparklesIcon className="size-4 stroke-gray-600" />}>
                            Getting started
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Item color="red"
                            leftSection={<LogOutIcon className="size-4 stroke-gray-600" />}>
                            Sign out
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </aside>
            <div className="flex-auto flex flex-col relative bg-gray-100/50">
                <ScrollArea className="flex-1">
                    <div className="xl:container xl:mx-auto p-8 py-6">
                        <Outlet />
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default AdminLayout
// export default withOidcSecure(AdminLayout);