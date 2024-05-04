import { PaginitionReqParams } from '@/@types';
import { request } from '@/lib/request';

const ROOT_URL = '/api/admin/usergroups';

class UserGroupService {
    getGroups(
        params: {
            searchKey?: string;
        } & PaginitionReqParams,
    ) {
        return request(ROOT_URL, {
            method: 'GET',
            params: {
                pageIndex: params.current,
                pageSize: params.pageSize,
                searchKey: params.searchKey,
            },
        });
    }
}

export default UserGroupService;
