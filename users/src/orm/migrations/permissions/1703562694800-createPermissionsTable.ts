import { idColumn } from 'src/orm/common/columns';
import { idIndex } from 'src/orm/common/indexes';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'permissions';
export class CreatePermissionsTable1703562694800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
        ],
        indices: [
          idIndex,
          {
            columnNames: ['slug'],
          },
        ],
      }),
      true,
      true,
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
