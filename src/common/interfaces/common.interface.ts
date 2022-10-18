interface PaginationParams {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface IPagination<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  page?: number;
  limit?: number;
  content?: number;
  status?: number;
  startTime?: string;
  endTime?: string;
  sort?: string;

  //Match any key if fields are not defined
  [key: string]: any;
}

export interface ParamsCommonGetDetail<T> {
  conditions: Partial<T>;
  overwriteConditions?: Partial<T>;
  select?: (keyof T)[];
  unselect?: string[];
}

export interface ParamsCommonList<T> {
  conditions: any;
  alias: string;
  paginate: {
    page: number;
    pageSize: number;
    sort: string;
  };
  overwriteConditions?: any;
  select?: (keyof T)[];
  unselect?: string[];
}

export interface ParamsUpdateCommonList<T> {
  conditions: Partial<T>;
  overwriteConditions?: Partial<T>;
  select?: (keyof T)[];
  data: Partial<T>;
}
