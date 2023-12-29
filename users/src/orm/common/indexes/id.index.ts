import { TableIndexOptions } from 'typeorm';

export const idIndex: TableIndexOptions = {
  columnNames: ['id'],
  isUnique: true,
};
