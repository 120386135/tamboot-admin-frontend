import request from '@/utils/request';

export async function page(query) {
  return request('/system/user/page', { body: query });
}

export async function create(body) {
  return request('/system/user/create', { method: 'POST', body });
}

export async function enable(userId) {
  return request(`/system/user/enable/${userId}`, { method: 'POST' });
}

export async function disable(userId) {
  return request(`/system/user/disable/${userId}`, { method: 'POST' });
}

export async function resetPassword(body) {
  return request('/system/user/resetPassword', { method: 'POST', body });
}

export async function assignRoles(body) {
  return request('/system/user/assignRoles', { method: 'POST', body });
}
