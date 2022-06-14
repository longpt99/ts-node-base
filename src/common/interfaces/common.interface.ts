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

export interface ParamsCommonList {
  conditions: any;
  overwriteConditions?: any;
  select?: string[];
}
