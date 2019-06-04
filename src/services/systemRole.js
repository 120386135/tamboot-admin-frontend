import request from '@/utils/request';
import { apiPath } from '@/defaultSettings';

export async function list() {
    return request(`${apiPath}/system/role/list`);
}

export async function page(body) {
    return request(`${apiPath}/system/role/page`, {body});
}

export async function assignMenus(body) {
    return request(`${apiPath}/system/role/assignMenus`, {
        method: 'POST',
        body
    })
}

export async function create(body) {
    return request(`${apiPath}/system/role/create`, {
        method: 'POST',
        body
    })
}

export async function update(body) {
    return request(`${apiPath}/system/role/update`, {
        method: 'POST',
        body
    })
}

export async function del(roleId) {
    return request(`${apiPath}/system/role/delete/${roleId}`, {
        method: 'POST'
    })
}