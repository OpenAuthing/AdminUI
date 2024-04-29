import { CreatePositionModel } from '@/@types/position';
import { request } from '@/lib/request';

class PositionService {
    getPositions(pageIndex: number = 1, pageSize: number = 10, searchKey?: string) {
        return request('/api/admin/positions', {
            params: {
                pageIndex,
                pageSize,
                searchKey,
            },
        });
    }

    createPosition(data: CreatePositionModel) {
        return request('/api/admin/positions', {
            method: 'POST',
            data,
        });
    }

    deletePosition(id: string) {
        return request(`/api/admin/positions/${id}`, {
            method: 'DELETE',
        });
    }
}

export default PositionService;
