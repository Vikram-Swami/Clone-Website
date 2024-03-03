import requests from "./httpService";

class ApiClient {
  constructor() { }
  async getData(url) {
    console.log("asfdas", url);
    return await requests.get(url);
  }

  async createData(url, data) {
    return await requests.post(url, data);
  }

  async deleteData(url, id) {
    return await requests.delete(`${url}/${id}`);
  }

  async getDataByParam(url, param) {
    return await requests.get(`${url}/${param}`);
  }

  async getDataWithPagination(url, page, limit) {
    return await requests.get(`${url}/${page}/${limit}`);
  }

}

export default ApiClient;
