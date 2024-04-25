import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
    title: 'OpenAuthing',
    routes,
    esbuildMinifyIIFE: true,
    npmClient: 'yarn',
    helmet: false,
    icons: {},
    history: {
        type: 'browser',
    },
    historyWithQuery: {},
    headScripts: [
        // "css-prefers-color-scheme/dist/browser-global.js"
    ],
    links: [{ href: 'https://rsms.me/inter/inter.css', rel: 'stylesheet' }],
    plugins: [
        '@umijs/plugins/dist/initial-state',
        '@umijs/plugins/dist/model',
        '@umijs/plugins/dist/tailwindcss',
        '@umijs/plugins/dist/request',
        '@umijs/plugins/dist/locale',
    ],
    tailwindcss: {},
    locale: {
        default: 'en-US',
        baseSeparator: '-',
    },
    request: {
        dataField: 'data',
    },
    model: {},
});
