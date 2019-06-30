import request from '@/utils/request';

export async function login(body) {
  const formData = new FormData();
  formData.append('username', body.username);
  formData.append('password', body.password);
  return request('/login', { method: 'POST', body: formData, ignoreDefaultFailHandler: true });
}
