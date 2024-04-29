import { ResponseResult } from '@/@types';
import RootContainer from '@/components/RootContainer';
import { OidcClient } from '@axa-fr/react-oidc';
import React from 'react';
import { AxiosRequestConfig, AxiosResponse, RuntimeConfig, getIntl, getLocale, history } from 'umi';

const toast = {
    error: (msg: string) => console.error(msg),
};

export const request: RuntimeConfig['request'] = {
    timeout: 10000,
    beforeRedirect(options: any, responseDetails: any) {
        console.log('redirect', responseDetails);
    },
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    // other axios options you want
    errorConfig: {
        // 错误抛出
        errorThrower: (res: any) => {
            console.error('errorThrower', res);
            const { success, data, errorCode, errorMessage } = res;
            if (!success) {
                const error: any = new Error(errorMessage);
                error.name = 'BizError';
                error.info = { code: errorCode, errorMessage, data };
                throw error; // 抛出自制的错误
            }
        },
        // 错误接收及处理
        errorHandler: async (error: any, opts: any) => {
            console.error('errorHandler', error);
            const intl = getIntl();
            // 取消请求时跳过全局错误处理
            if (error.name === 'CanceledError') return;
            if (opts?.skipErrorHandler) throw error;
            // 我们的 errorThrower 抛出的错误。
            if (error.name === 'BizError') {
                const errorInfo: ResponseResult | undefined = error.info;
                if (errorInfo) {
                    const { code, errorMessage } = errorInfo;
                    errorMessage && toast.error(errorMessage);

                    // todo 使用errorcode 搭配多语言返回错误信息
                }
            } else if (error.response) {
                // Axios 的错误
                // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                if (error.response.status === 401) {
                    toast.error(intl.formatMessage({ id: 'common.error.401' }));

                    history.push({
                        pathname: '/logout',
                        search: `?returnUrl=${encodeURIComponent('/account/login')}`,
                    });

                    return;
                }
                toast.error(`Response status:${error.response.status}`);
            } else if (error.request) {
                // 请求已经成功发起，但没有收到响应
                // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
                // 而在node.js中是 http.ClientRequest 的实例
                toast.error('None response! Please retry.');
            } else {
                // 发送请求时出了点问题
                toast.error('Request error, please retry.');
            }
        },
    },
    requestInterceptors: [
        (config: AxiosRequestConfig) => {
            const oidc = OidcClient.get();
            let headers = config.headers || {};
            if (oidc && oidc?.tokens) {
                headers['Authorization'] = `Bearer ${oidc.tokens.accessToken}`;
            }

            // Accept-Language
            const locale = getLocale();
            if (locale) {
                config.headers = {
                    ...config.headers,
                    'Accept-Language': locale,
                };
            }
            const baseURL = ADMIN_API_BASE_URL;

            return {
                ...config,
                baseURL,
            };
        },
    ],
    responseInterceptors: [
        (response: AxiosResponse) => {
            if (response.status === 401) {
                const unauthorizedError = new Error('Unauthorized');
                unauthorizedError.name = 'UnauthorizedError';
                throw unauthorizedError;
            }

            const { code: errorCode, message: errorMessage, data } = response.data;
            response.data = {
                errorCode,
                errorMessage,
                data,
                success: errorCode === 200,
            };

            return response;
        },
    ],
};

export const rootContainer: RuntimeConfig['rootContainer'] = (
    lastContainer: JSX.Element,
    args?: any,
) => {
    return React.createElement(RootContainer, null, lastContainer);
};

export const locale: RuntimeConfig['locale'] = {
    // locale: string
    // formats: CustomFormats
    // messages: Record<string, string> | Record<string, MessageFormatElement[]>
    // defaultLocale: string
    // defaultFormats: CustomFormats
    // timeZone?: string
    // textComponent?: React.ComponentType | keyof React.ReactHTML
    // wrapRichTextChunksInFragment?: boolean
    // defaultRichTextElements?: Record<string, FormatXMLElementFn<React.ReactNode>>
    // onError(err: string): void
};
