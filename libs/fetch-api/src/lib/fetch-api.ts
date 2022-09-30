// TODO as actually lib, currently we just quickly need data
// warning: do not use in production!

import { cvsToJson } from './cvs-to-json/cvs-to-json';

export interface FetchApiRes {
  data: Array<unknown> | null;
}

export async function fetchApi(
  url: string,
  type: string
): Promise<FetchApiRes> {
  const response = await fetch(url);
  const data = await response.text();

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  if (type === 'csv') return cvsToJson(data);

  return JSON.parse(data);
}
