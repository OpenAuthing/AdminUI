import { PaginitionReqParams } from '@/@types';
import { CreateUserGroupReq } from '@/@types/usergroup';
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

    getGroup(id: string) {
        return request(`${ROOT_URL}/${id}`, {
            method: 'GET',
        });
    }

    createGroup(req: CreateUserGroupReq) {
        return request(ROOT_URL, {
            method: 'POST',
            data: req,
        });
    }

    getGroupMembers(groupId: string) {
        return request(`${ROOT_URL}/${groupId}/members`, {
            method: 'GET',
        });
    }
}

export default UserGroupService;
