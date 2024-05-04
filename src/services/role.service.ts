import { PaginitionReqParams } from '@/@types';
import { CreateRoleReq } from '@/@types/role';
import { request } from '@/lib/request';

const ROOT_URL = '/api/admin/roles';

class RoleService {
    getRoles(
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

    getRole(id: string) {
        return request(`${ROOT_URL}/${id}`, {
            method: 'GET',
        });
    }

    createRole(req: CreateRoleReq) {
        return request(ROOT_URL, {
            method: 'POST',
            data: req,
        });
    }

    getSubjects(roleId: string) {
        return request(`${ROOT_URL}/${roleId}/subjects`, {
            method: 'GET',
        });
    }
}

export default RoleService;
