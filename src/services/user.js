import { stringify } from 'qs';
import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryPdf() {
  return request('/api/myPdf');
}

export async function queryPros() {
  return request('/api/myPro');
}

export async function queryTra(params) {
  console.log(111)
  return request(`/api/myTra?${stringify(params)}`);
}
