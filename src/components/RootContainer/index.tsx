import theme from '@/theme';
import {
    Avatar,
    Button,
    ColorSchemeScript,
    InputWrapper,
    LoadingOverlay,
    MantineProvider,
    Modal,
    Tabs,
    createTheme,
} from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import React from 'react';
import { UseRequestProvider, getLocale } from 'umi';

import { ModalsProvider } from '@mantine/modals';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import { UserIcon } from 'lucide-react';

const mantineTheme = createTheme({
    colors: {
        primary: [
            theme.colors.primary[50],
            theme.colors.primary[100],
            theme.colors.primary[200],
            theme.colors.primary[300],
            theme.colors.primary[500],
            theme.colors.primary[600],
            theme.colors.primary[700],
            theme.colors.primary[800],
            theme.colors.primary[900],
            theme.colors.primary[950],
        ],
    },
    primaryColor: 'primary',
    primaryShade: 4,
    fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
    components: {
        Button: Button.extend({
            defaultProps: {
                loaderProps: {
                    type: 'dots',
                },
            },
        }),
        LoadingOverlay: LoadingOverlay.extend({
            defaultProps: {
                overlayProps: {
                    blur: 2,
                },
            },
        }),
        InputWrapper: InputWrapper.extend({
            defaultProps: {
                inputWrapperOrder: ['label', 'input', 'description', 'error'],
            },
        }),
        Container: {
            classNames: 'px-6',
        },
        Avatar: Avatar.extend({
            defaultProps: {
                color: 'primary.5',
                children: <UserIcon className="size-5" />,
            },
        }),
        Tabs: Tabs.extend({
            defaultProps: {
                fw: 500,
            },
            classNames: {
                tab: 'data-[active=true]:text-primary-500',
            },
        }),
        Modal: Modal.extend({
            defaultProps: {
                overlayProps: {
                    blur: 2,
                },
            },
        }),
    },
});

const RootContainer = ({ children }: { children: React.ReactNode }) => {
    const locale = getLocale();

    return (
        <>
            <ColorSchemeScript />
            <UseRequestProvider
                value={{
                    throwOnError: true,
                }}
            >
                <MantineProvider theme={mantineTheme}>
                    <Notifications />
                    <ModalsProvider>
                        <DatesProvider settings={{ locale: locale }}>{children}</DatesProvider>
                    </ModalsProvider>
                </MantineProvider>
            </UseRequestProvider>
        </>
    );
};

export default RootContainer;
