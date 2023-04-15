import ApiCall from './api_call';

class RestResource {
  constructor(basePath) {
    this.basePath = basePath;
  }

  paginatedList(params, paginationData) {
    return ApiCall.get(
      this.basePath,
      Object.assign({}, params, { page: paginationData.page, per_page: paginationData.per_page }),
    );
  }

  list(params) {
    return ApiCall.get(this.basePath, params);
  }

  create(data) {
    return ApiCall.post(this.basePath, data);
  }

  delete(id, params) {
    return ApiCall.delete(`${this.basePath}/${id}`, params);
  }

  update(id, data) {
    return ApiCall.put(`${this.basePath}/${id}`, data);
  }
}

export default RestResource;
