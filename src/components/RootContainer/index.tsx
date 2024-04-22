import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core'
import theme from '@/theme'
import { UseRequestProvider, getLocale } from 'umi';
import React from 'react';
import { DatesProvider } from '@mantine/dates';

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

const InputClassnames = "ring-1 ring-transparent focus:ring-primary-500 transition-[shadow]"

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
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
    components: {
        TextInput: {
            classNames: {
                input: InputClassnames
            }
        },
        Textarea: {
            classNames: {
                input: InputClassnames
            }
        },
        Select: {
            classNames: {
                input: InputClassnames
            }
        }
    }
});

const RootContainer = ({ children }: { children: React.ReactNode }) => {

    const locale = getLocale()

    return (
        <>
            <ColorSchemeScript />
            <UseRequestProvider value={{ throwOnError: true }}>
                <MantineProvider theme={mantineTheme}>
                    <DatesProvider settings={{ locale: locale }}>
                        {children}
                    </DatesProvider>
                </MantineProvider>
            </UseRequestProvider>
        </>
    )
}

export default RootContainer