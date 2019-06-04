import request from '@/utils/request';
import { apiPath } from '@/defaultSettings';

export async function tree() {
    return request(`${apiPath}/system/menu/tree`);
}

export async function roleMenus(roleId) {
    return request(`${apiPath}/system/menu/roleMenus?roleId=${roleId}`);
}

export async function update(body) {
    return request(`${apiPath}/system/menu/update`, {
        method: 'POST',
        body
    })
}

export async function create(body) {
    return request(`${apiPath}/system/menu/create`, {
        method: 'POST',
        body
    })
}

export async function del(menuId) {
    return request(`${apiPath}/system/menu/delete/${menuId}`, {
        method: 'POST'
    })
}