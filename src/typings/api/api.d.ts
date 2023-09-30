// // 通用后端接口相关类型
declare namespace Api {
  // 通用返回类型
  // interface
  type Return<T> = {
    code: number;
    data: T;
    messge: string;
    /**
     * 其他
     */
  } | null;
}
