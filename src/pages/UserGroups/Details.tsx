import withRouteParams from '@/hoc/withRouteParams';

type UserGroupDetailsPageProps = {
    id: string;
};

const UserGroupDetailsPage: React.FC<UserGroupDetailsPageProps> = ({ id }) => {
    return (
        <div>
            <a>{id}</a>
        </div>
    );
};

export default withRouteParams(UserGroupDetailsPage, 'id');
