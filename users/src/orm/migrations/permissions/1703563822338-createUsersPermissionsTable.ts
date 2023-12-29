import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'users_permissions';
const usersTableName = 'users';
const permissionsTableName = 'permissions';
export class CreateUsersPermissionsTable1703563822338
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'user_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'permission_id',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['permission_id'],
            referencedColumnNames: ['id'],
            referencedTableName: permissionsTableName,
          },
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: usersTableName,
          },
        ],
        indices: [
          {
            columnNames: ['permission_id'],
          },
          {
            columnNames: ['user_id'],
          },
          {
            columnNames: ['permission_id', 'user_id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
