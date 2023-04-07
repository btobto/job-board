export interface PaginationResult<T> {
  data: T[];
  page: number;
  take: number;
  totalCount: number;
  pageCount: number;
}
