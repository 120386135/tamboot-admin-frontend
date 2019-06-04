import request from '@/utils/request';
import { apiPath } from '@/defaultSettings';

export async function details() {
    return request(`${apiPath}/common/user/details`);
}

export async function updatePassword(body) {
    return request(`${apiPath}/common/user/updatePassword`, {method: 'POST', body});
}