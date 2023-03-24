export interface PaginationResultDto<T> {
  data: T[];
  page: number;
  take: number;
  totalCount: number;
}
