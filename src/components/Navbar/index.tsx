// import { Transition } from "@headlessui/react";
import { MenuIconType } from '@/@types';
import { MantineTransition, Text, Transition } from '@mantine/core';
import {
    ChevronDown,
    ChevronUp,
    Fingerprint,
    Key,
    MonitorSmartphone,
    Network,
    Palette,
    Settings,
    ShieldCheckIcon,
    SparklesIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { LinkProps } from 'react-router-dom';
import { FormattedMessage, Link, useAppData, useIntl, useSelectedRoutes } from 'umi';

const menuTransition = {
    common: {},
    in: { gridTemplateRows: '1fr', opacity: 1 },
    out: { gridTemplateRows: '0fr', opacity: 0 },
    transitionProperty: 'grid-template-rows, opacity',
} as MantineTransition;

const NestedNavMenu = ({
    icon,
    label,
    items,
    selectedRouteKeys,
}: {
    icon: React.ReactNode;
    label: string;
    selected?: boolean;
    items: Array<{ id: string; label: string; href: string }>;
    selectedRouteKeys: string[];
}) => {
    const selected = items.some((item) => selectedRouteKeys.includes(item.id));
    const [opened, setOpended] = useState(selected);

    return (
        <div className="cursor-pointer">
            <div
                className="group flex items-center px-2 py-2.5 rounded hover:bg-primary-50 transition-colors duration-300"
                aria-selected={selected}
                onClick={() => setOpended(!opened)}
            >
                <span>{icon}</span>
                <Text
                    className="flex-1 ml-3 truncate group-hover:text-primary-600 group-aria-selected:text-primary-600 transition-colors duration-300"
                    size="sm"
                    fw={500}
                >
                    <FormattedMessage id={label} />
                </Text>
                <span className="group-hover:text-primary-600">
                    {opened ? (
                        <ChevronUp className="w-4 h-4 stroke-2" />
                    ) : (
                        <ChevronDown className="w-4 h-4 stroke-2" />
                    )}
                </span>
            </div>

            <Transition
                mounted={opened}
                transition={menuTransition}
                duration={200}
                timingFunction="ease-in-out"
                keepMounted
            >
                {(style) => (
                    <div style={{ ...style }} className="grid grid-rows-[0fr] opacity-0">
                        <div className="w-full overflow-hidden">
                            {items.map((item) => (
                                <Link
                                    to={item.href}
                                    key={item.id}
                                    aria-selected={selectedRouteKeys.includes(item.id)}
                                    className="mt-1.5 block py-2.5 pl-10 rounded text-gray-500 hover:bg-blue-50 hover:text-primary-600 aria-selected:text-primary-600 aria-selected:bg-blue-100 transition-colors duration-300"
                                >
                                    <Text size="sm" fw={400} truncate>
                                        <FormattedMessage id={item.label} />
                                    </Text>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    );
};

interface NavMenuItemProps extends LinkProps {
    text: React.ReactNode;
    icon?: React.JSX.Element;
    selected: boolean;
}

const NavMenuItem = ({ to, text, icon, selected = false }: NavMenuItemProps) => {
    return (
        <Link
            to={to}
            aria-selected={selected}
            className="group flex items-center px-2 py-2.5 rounded hover:bg-blue-50 aria-selected:bg-blue-100 transition-colors duration-300"
        >
            <span>{icon}</span>
            <Text
                className="flex1 ml-3 truncate group-hover:text-primary-600 group-aria-selected:text-primary-600 transition-colors duration-300"
                size="sm"
                fw={500}
            >
                {text}
            </Text>
        </Link>
    );
};

type NavMenuItemType = {
    id: string;
    href?: string;
    label: string;
    icon?: MenuIconType;
    items?: Array<{ id: string; label: string; href: string }>;
};

const getIcon = (icon?: MenuIconType) => {
    switch (icon) {
        case 'Sparkles':
            return (
                <SparklesIcon className="w-5 h-5 stroke-gray-600 group-aria-selected:stroke-blue-600 group-hover:stroke-blue-600" />
            );
        case 'Dashboard':
            return (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                        className="fill-gray-400 group-hover:fill-blue-600 group-aria-selected:fill-blue-600 transition-colors duration-300"
                    ></path>
                    <path
                        d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                        className="fill-gray-300 group-hover:fill-gray-400 group-aria-selected:fill-gray-400 transition-colors duration-300"
                    ></path>
                </svg>
            );
        case 'Key':
            return (
                <Key className="w-5 h-5 stroke-gray-600 group-aria-selected:stroke-blue-600 group-hover:stroke-blue-600" />
            );
        case 'Network':
            return (
                <Network className="size-5 stroke-gray-500 group-aria-selected:stroke-blue-600 group-hover:stroke-blue-600" />
            );
        case 'ShieldCheckIcon':
            return (
                <ShieldCheckIcon className="w-5 h-5 stroke-gray-600 group-aria-selected:stroke-blue-600 group-hover:stroke-blue-600" />
            );
        case 'MonitorSmartphone':
            return (
                <MonitorSmartphone className="w-5 h-5 stroke-gray-600 group-aria-selected:stroke-blue-600 group-hover:stroke-blue-600" />
            );
        case 'Fingerprint':
            return (
                <Fingerprint className="w-5 h-5 stroke-gray-600 group-aria-selected:stroke-blue-600 group-hover:stroke-blue-600" />
            );
        case 'Palette':
            return (
                <Palette className="w-5 h-5 stroke-gray-600 group-aria-selected:stroke-blue-600 group-hover:stroke-blue-600" />
            );
        case 'Settings':
            return (
                <Settings className="w-5 h-5 stroke-gray-600 group-aria-selected:stroke-blue-600 group-hover:stroke-blue-600" />
            );
        default:
            return <></>;
    }
};

const Navbar = () => {
    const intl = useIntl();
    const { routes } = useAppData();
    const selectedRoutes: any = useSelectedRoutes();
    const [menuTree, setMenuTree] = useState<NavMenuItemType[]>([]);
    useEffect(() => {
        const menuRoutes = [];
        for (const key in routes) {
            const route: any = routes[key];
            if (route.showInMenu) {
                const parent: any = routes[route.parentId];
                const parentId = parent.showInMenu ? parent.id : null;
                menuRoutes.push({
                    ...route,
                    parentId: parentId,
                    href: route.path,
                });
            }
        }
        const menuTree: any = [];
        for (const menu of menuRoutes) {
            if (!menu.parentId) {
                menuTree.push(menu);
            } else {
                const parent: NavMenuItemType = menuRoutes.find(
                    (item) => item.id === menu.parentId,
                );
                if (parent) {
                    if (!parent.items) {
                        parent.items = [];
                    }
                    parent.items.push(menu);
                }
            }
        }
        setMenuTree(menuTree);
    }, []);

    const selectedRouteKeys = useMemo(
        () => selectedRoutes.filter((x: any) => x.route.showInMenu).map((x: any) => x.route.id),
        [selectedRoutes],
    );

    return (
        <ul className="space-y-2 text-sm text-gray-900 dark:text-white select-none">
            {menuTree.map((menu) => (
                <li key={menu.id}>
                    {menu.items?.length ?? false ? (
                        <NestedNavMenu
                            selectedRouteKeys={selectedRouteKeys}
                            icon={getIcon(menu.icon)}
                            label={menu.label}
                            items={menu.items!}
                        />
                    ) : (
                        <NavMenuItem
                            to={menu.href!}
                            selected={selectedRouteKeys.includes(menu.id)}
                            icon={getIcon(menu.icon)}
                            text={intl.formatMessage({ id: menu.label })}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default Navbar;
