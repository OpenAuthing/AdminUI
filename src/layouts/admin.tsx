import { FormattedMessage, Outlet, getAllLocales, getLocale, setLocale } from "umi"
import { AppShell, Avatar, Burger, Group, MantineColorScheme, Menu, ScrollArea, UnstyledButton, keys, useMantineColorScheme } from "@mantine/core";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { CheckIcon, ChevronRightIcon, LanguagesIcon, LogOutIcon, MonitorIcon, MoonStarIcon, SparklesIcon, SunIcon, SunMoonIcon, UserIcon } from "lucide-react";
import React from "react";
import { useDisclosure } from "@mantine/hooks";

const Themes: Record<MantineColorScheme, { label: string, icon: React.ReactNode }> = {
    "auto": { label: 'theme.system', icon: <MonitorIcon className="size-4" /> },
    "light": { label: 'theme.light', icon: <SunIcon className="size-4" /> },
    "dark": { label: 'theme.dark', icon: <MoonStarIcon className="size-4" /> },
}

const Languages: Record<any, { name: string, icon: React.ReactElement }> = {
    "en-US": {
        name: "English (US)",
        icon: (<svg className="w-4 h-4 rounded-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g fillRule="evenodd"><g strokeWidth="1pt"><path fill="#bd3d44" d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"></path><path fill="#fff" d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z" transform="scale(3.9385)"></path></g><path fill="#192f5d" d="M0 0h98.8v70H0z" transform="scale(3.9385)"></path><path fill="#fff" d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z" transform="scale(3.9385)"></path></g></svg>)
    },
    "zh-CN": {
        name: "中文 (简体)",
        icon: (<svg className="w-4 h-4 rounded-full" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" id="flag-icon-css-cn" viewBox="0 0 512 512"><defs><path id="a" fill="#ffde00" d="M1-.3L-.7.8 0-1 .6.8-1-.3z"></path></defs><path fill="#de2910" d="M0 0h512v512H0z"></path><use width="30" height="20" transform="matrix(76.8 0 0 76.8 128 128)" xlinkHref="#a"></use><use width="30" height="20" transform="rotate(-121 142.6 -47) scale(25.5827)" xlinkHref="#a"></use><use width="30" height="20" transform="rotate(-98.1 198 -82) scale(25.6)" xlinkHref="#a"></use><use width="30" height="20" transform="rotate(-74 272.4 -114) scale(25.6137)" xlinkHref="#a"></use><use width="30" height="20" transform="matrix(16 -19.968 19.968 16 256 230.4)" xlinkHref="#a"></use></svg>)
    }
}

const AdminLayout = () => {
    const [opened, { toggle }] = useDisclosure();
    const { colorScheme, setColorScheme } = useMantineColorScheme()
    const changeLang = (lang: string): void => {
        setLocale(lang, true);
    };
    const currentLocale = getLocale()
    const currentLanguage = Languages[currentLocale];

    return (
        <AppShell
            header={{ height: 56 }}
            navbar={{ width: 264, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <div className="flex-1">
                        <Header />
                    </div>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <AppShell.Section p="md" grow component={ScrollArea}>
                    <Navbar />
                </AppShell.Section>
                <AppShell.Section>
                    <Menu position="right-end" offset={-10} width={260}>
                        <Menu.Target>
                            <div className="flex-initial grid grid-cols-1 items-center w-full h-16 border-t border-gray-200 transition-colors hover:bg-gray-50 cursor-pointer">
                                <div className="group flex text-sm px-3 gap-x-2 items-center">
                                    <Avatar size={38} />
                                    <div className="flex flex-col gap-y-0.5 items-start justify-center">
                                        <span className="font-medium">Ender</span>
                                        <span className="text-gray-600 text-xs">zengande@outlook.com</span>
                                    </div>
                                    <UnstyledButton className="ml-auto">
                                        <ChevronRightIcon className="size-5 stroke-gray-500 transition-all group-hover:stroke-gray-700" />
                                    </UnstyledButton>
                                </div>
                            </div>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>
                                <FormattedMessage id="layouts.admin.menu.appearance" />
                            </Menu.Label>

                            <Menu position="right-end" offset={10} width={160}>
                                <Menu.Target>
                                    <Menu.Item closeMenuOnClick={false}
                                        leftSection={<LanguagesIcon className="size-4 stroke-gray-600" />}
                                        rightSection={<ChevronRightIcon className="size-4 stroke-gray-600" />}>
                                        <div className="flex items-center justify-between">
                                            <span><FormattedMessage id="layouts.admin.menu.language" /></span>
                                            <span className="text-xs text-gray-400">{currentLanguage.name}</span>
                                        </div>
                                    </Menu.Item>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    {getAllLocales().map((locale) => {
                                        const language = Languages[locale]
                                        if (language === undefined) return null
                                        const active = locale === currentLocale
                                        return (
                                            <Menu.Item onClick={() => changeLang(locale)}
                                                key={locale}
                                                leftSection={language.icon}
                                                className={active ? "text-primary-600" : "text-gray-600"}>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs">{language.name}</span>
                                                    {active &&
                                                        <CheckIcon className="size-4" />
                                                    }
                                                </div>
                                            </Menu.Item>
                                        )
                                    })}
                                </Menu.Dropdown>
                            </Menu>
                            <Menu position="right-end" offset={10} width={160} withinPortal={false}>
                                <Menu.Target>
                                    <Menu.Item closeMenuOnClick={false}
                                        leftSection={<SunMoonIcon className="size-4 stroke-gray-600" />}
                                        rightSection={<ChevronRightIcon className="size-4 stroke-gray-600" />}>
                                        <div className="flex items-center justify-between">
                                            <span><FormattedMessage id="layouts.admin.menu.theme" /></span>
                                            <span className="text-xs text-gray-400">
                                                <FormattedMessage id={Themes[colorScheme].label} />
                                            </span>
                                        </div>
                                    </Menu.Item>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    {keys(Themes).map((key) => {
                                        const theme = Themes[key]
                                        const active = key === colorScheme
                                        return (
                                            <Menu.Item key={key}
                                                leftSection={theme.icon}
                                                className={active ? "text-primary-600" : "text-gray-600"}
                                                onClick={() => setColorScheme(key)}>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs">
                                                        <FormattedMessage id={theme.label} />
                                                    </span>
                                                    {active &&
                                                        <CheckIcon className="size-4" />
                                                    }
                                                </div>
                                            </Menu.Item>
                                        )
                                    })}

                                </Menu.Dropdown>
                            </Menu>

                            <Menu.Divider />
                            <Menu.Label>
                                <FormattedMessage id="layouts.admin.menu.others" />
                            </Menu.Label>

                            <Menu.Item component="a" href="/"
                                leftSection={<UserIcon className="size-4 stroke-gray-600" />}>
                                <FormattedMessage id="layouts.admin.menu.yourprofile" />
                            </Menu.Item>
                            <Menu.Item component="a" href="/admin"
                                leftSection={<SparklesIcon className="size-4 stroke-gray-600" />}>
                                <FormattedMessage id="layouts.admin.menu.gettingstarted" />
                            </Menu.Item>

                            <Menu.Divider />

                            <Menu.Item color="red"
                                leftSection={<LogOutIcon className="size-4 stroke-gray-600" />}
                                component="a" href="/signout">
                                <FormattedMessage id="layouts.admin.menu.signout" />
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}

export default AdminLayout
// export default withOidcSecure(AdminLayout);