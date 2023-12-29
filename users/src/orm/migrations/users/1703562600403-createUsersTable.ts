import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { idColumn } from 'src/orm/common/columns';
import { idIndex } from 'src/orm/common/indexes';
const tableName = 'users';
export class CreateUsersTable1703562600403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          idColumn,
          {
            name: 'first_name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'phonenumber',
            type: 'varchar',
            length: '10',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'lang',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'is_super_user',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'login_at',
            type: 'bigint',
            isNullable: false,
          },
        ],
        indices: [
          idIndex,
          {
            columnNames: ['phonenumber'],
          },
          {
            columnNames: ['status'],
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
