import request from '@/utils/request';
import { apiPath } from '@/defaultSettings';

export async function page(query) {
    return request(`${apiPath}/system/user/page`, {body: query});
}

export async function create(body) {
    return request(`${apiPath}/system/user/create`, {method: 'POST', body});
}

export async function enable(userId) {
    return request(`${apiPath}/system/user/enable/${userId}`, {method: 'POST'});
}

export async function disable(userId) {
    return request(`${apiPath}/system/user/disable/${userId}`, {method: 'POST'});
}

export async function resetPassword(body) {
    return request(`${apiPath}/system/user/resetPassword`, {method: 'POST', body});
}

export async function assignRoles(body) {
    return request(`${apiPath}/system/user/assignRoles`, {method: 'POST', body});
}