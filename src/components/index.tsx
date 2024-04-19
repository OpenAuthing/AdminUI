import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core'
import theme from '@/theme'
import { UseRequestProvider } from 'umi';
import React from 'react';

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
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji"
});

export const RootContainer = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <ColorSchemeScript />
            <UseRequestProvider value={{ throwOnError: true }}>
                <MantineProvider theme={mantineTheme}>
                    {children}
                </MantineProvider>
            </UseRequestProvider>
        </>
    )
}