import { OidcClient } from '@axa-fr/oidc-client';
import { OidcConfiguration, OidcProvider, TokenRenewMode } from '@axa-fr/react-oidc';
import { notifications } from '@mantine/notifications';
import { Outlet } from 'umi';

const configuration: OidcConfiguration = {
    authority: ODIC_AUTHORITY,
    client_id: ODIC_CLIENT_ID,
    redirect_uri: window.location.origin + '/login',
    silent_redirect_uri: window.location.origin + '/silent-login',
    scope: 'openid profile phone roles offline_access',
    service_worker_only: false,
    service_worker_convert_all_requests_to_cors: true,
    storage: localStorage,
    token_renew_mode: TokenRenewMode.access_token_invalid,
};

export default function Layout() {
    const handleOidcEvent = (configName: string, eventName: string, data: any) => {
        // console.log(`oidc:${configName}:${eventName}: ${JSON.stringify(data)}`)

        if (data.success && eventName === OidcClient.eventNames.refreshTokensAsync_end) {
            notifications.show({
                title: 'Access token refreshed',
                message: 'Access token has been refreshed successfully!',
            });
        }
    };

    return (
        <OidcProvider configuration={configuration} onEvent={handleOidcEvent}>
            <Outlet />
        </OidcProvider>
    );
}
