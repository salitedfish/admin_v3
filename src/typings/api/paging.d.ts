// 通用分页相关接口类型
declare namespace ApiPaging {
  interface Params {
    pageSize: number;
    page: number;
    /**
     * 其他
     */
  }

  interface Return<T> {
    list: T;
    total: number;
    /**
     * 其他
     */
  }
}
