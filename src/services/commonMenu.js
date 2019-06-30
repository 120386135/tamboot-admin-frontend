import request from '@/utils/request';

export async function tree() {
  return request('/common/menu/tree');
}
