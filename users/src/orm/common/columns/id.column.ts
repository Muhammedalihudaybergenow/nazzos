import { TableColumnOptions } from 'typeorm';

export const idColumn: TableColumnOptions = {
  name: 'id',
  type: 'integer',
  isPrimary: true,
  isGenerated: true,
  isNullable: false,
};
