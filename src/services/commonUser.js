import request from '@/utils/request';

export async function details() {
  return request('/common/user/details');
}

export async function updatePassword(body) {
  return request('/common/user/updatePassword', { method: 'POST', body });
}
