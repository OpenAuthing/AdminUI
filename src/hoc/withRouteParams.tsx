import { useMemo } from 'react';
import { useParams } from 'umi';

export default function withRouteParams<P extends object>(
    Component: React.ComponentType<P>,
    ...args: Array<keyof P>
) {
    return function RouteParamsWrapper(props: P) {
        const params = useParams();
        const validKeys = Object.keys(params);
        const routeParams = useMemo(() => {
            const newProps: { [key: string]: string | undefined } = {};
            for (let i = 0; i < args.length; i++) {
                const key = args[i]?.toString();
                if (key === undefined || !validKeys.includes(key)) continue;

                const value = params[key];
                newProps[key] = value;
            }
            return newProps;
        }, [params]);

        return <Component {...props} {...routeParams} />;
    };
}
