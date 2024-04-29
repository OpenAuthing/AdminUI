import { OidcClient } from '@axa-fr/react-oidc';
import { useEffect } from 'react';

export default () => {
    useEffect(() => {
        const oidc = OidcClient.get();
        oidc.logoutAsync(window.location.origin + '/post-sign-out');
    }, []);

    return <div>sign out</div>;
};
