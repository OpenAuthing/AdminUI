import { useEffect } from 'react';
import { PropsWithUserId } from '.';

type UserGroupsProps = PropsWithUserId<{}>;

export default ({ userId }: UserGroupsProps) => {
    useEffect(() => {
        console.log('groups mounted');
        return () => {
            console.log('groups unmounted');
        };
    }, []);
    return <div>groups</div>;
};
