import request from '@/utils/request';
import { apiPath } from '@/defaultSettings';

export async function page(body) {
    return request(`${apiPath}/system/permission/page`, {body});
}

export async function create(body) {
    return request(`${apiPath}/system/permission/create`, {method: 'POST', body});
}

export async function update(body) {
    return request(`${apiPath}/system/permission/update`, {method: 'POST', body});
}

export async function refresh() {
    return request(`${apiPath}/system/permission/refresh`, {method: 'POST'});
}

export async function del(id) {
    return request(`${apiPath}/system/permission/delete/${id}`, {method: 'POST'});
}