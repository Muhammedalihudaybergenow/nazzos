import { LangEnum } from '../enums';

export class PaginationDto {
  page: number;
  limit: number;
  search?: string;
  orderBy: string;
  lang?: LangEnum;
  orderDirection: 'ASC' | 'DESC';
}
