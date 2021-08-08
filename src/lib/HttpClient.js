import axios from 'axios';
import networkConfig from '../configuration/networkConfig.json';
import statusDefine from '../static/constants/statusDefine';

const HttpClient = (() => {
  const request = Symbol('request');
  return class {
    constructor(options) {
      if (!this.instance) {
        try {
          const baseURL = `http://${networkConfig.dataSvc.ip}:${networkConfig.dataSvc.port}`;
          this.instance = axios.create({
            maxRedirects: 0,
            timeout: 1 * 60 * 1000,
            ...options,
            baseURL,
          });
        } catch (err) {
          throw err;
        }
      }
    }

    async [request](type, url, config) {
      try {
        const response = await this.instance[type](url, config);
        // console.log('http response: ', response);
        return response.data;
      } catch (err) {
        const error = err.response && err.response.data ? err.response.data : err;
        const { DISCONNECTED } = statusDefine.STATUS;
        if (error && error.indexOf) {
          throw error.indexOf('<title>Error</title>') !== -1 ? DISCONNECTED : error;
        } else if (typeof error === 'undefined') {
          throw DISCONNECTED;
        } else {
          throw error;
        }
      }
    }

    async get(url, config) {
      return this[request]('get', url, config);
    }

    async post(url, config) {
      return this[request]('post', url, config);
    }

    async put(url, config) {
      return this[request]('put', url, config);
    }

    async delete(url, config) {
      return this[request]('delete', url, config);
    }
  };
})();

export default HttpClient;
