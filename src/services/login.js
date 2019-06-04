import request from '@/utils/request';
import { apiPath } from '@/defaultSettings';

export async function login(body) {
    const formData = new FormData();
    formData.append('username', body.username);
    formData.append('password', body.password);
    return request(`${apiPath}/login`, {
        method: 'POST',
        body: formData,
        passFail: true
    });
}