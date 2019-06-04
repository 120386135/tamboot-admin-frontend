import request from '@/utils/request';
import { apiPath } from '@/defaultSettings';

export async function tree() {
    return request(`${apiPath}/common/menu/tree`);
}