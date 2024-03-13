import { idColumn } from 'src/orm/common/columns';
import { idIndex } from 'src/orm/common/indexes';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'roles';
export class CreateRolesTable1703562655750 implements MigrationInterface {
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
            isUnique: true,
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
