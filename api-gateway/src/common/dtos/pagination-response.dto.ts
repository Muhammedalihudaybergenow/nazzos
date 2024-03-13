export class PaginationResponseDto {
  entities: any;
  hasNext: boolean;
  currentPage: number;
  totalPages: number;
  total: number;
  entitiesCurrentCount: number;
  constructor(entities: any, total: number, page: number, limit: number) {
    this.entities = entities;
    this.total = total;
    this.totalPages = Math.round(
      total / (parseInt(`${limit}`) * parseInt(`${page}`)),
    );
    this.currentPage = parseInt(`${page}`);
    this.hasNext =
      Math.round(total / (parseInt(`${limit}`) * parseInt(`${page}`))) <
      parseInt(`${page}`);
    console.log(entities.length);
    this.entitiesCurrentCount = entities.length;
  }
}
