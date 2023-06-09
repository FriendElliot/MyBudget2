import axios from 'axios';

const apiAxiosInstance = axios.create({
  baseURL: '/api',
  responseType: 'json',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

const _snakelize = (key) => {
  let separator = '_';
  let split = /(?=[A-Z])/;

  return key.split(split).join(separator).toLowerCase();
};

const _camelToSnake = (obj) => {
  if (!obj) return obj;

  let result = {};
  let keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    result[_snakelize(keys[i])] = obj[keys[i]];
  }

  return result;
};

const ApiCall = {
  makeRequest(requestObj) {
    const csrfToken = document.querySelector('meta[name=csrf-token]').content;
    apiAxiosInstance.defaults.headers.common['X-CSRF-Token'] = csrfToken;

    return new Promise((resolve, reject) => {
      apiAxiosInstance(requestObj).then(
        (success) => { resolve(success.data); },
        (error) => { reject(error.response); },
      );
    });
  },
  get(path, params) {
    return this.makeRequest({ url: path, method: 'GET', params: _camelToSnake(params) });
  },
  delete(path, params) {
    return this.makeRequest({ url: path, method: 'DELETE', params: _camelToSnake(params) });
  },
  post(path, data) {
    return this.makeRequest({ url: path, data: _camelToSnake(data), method: 'POST' });
  },
  put(path, data) {
    return this.makeRequest({ url: path, data: _camelToSnake(data), method: 'PUT' });
  },
};

export default ApiCall;
