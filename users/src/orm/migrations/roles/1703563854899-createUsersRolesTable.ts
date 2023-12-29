import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'users_roles';
const usersTableName = 'users';
const rolesTableName = 'roles';
export class CreateUsersRolesTable1703563854899 implements MigrationInterface {
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
            name: 'role_id',
            type: 'integer',
            isNullable: false,
          },
        ],
        indices: [
          {
            columnNames: ['user_id'],
          },
          {
            columnNames: ['role_id'],
          },
          {
            columnNames: ['user_id', 'role_id'],
          },
        ],
        foreignKeys: [
          {
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: rolesTableName,
          },
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: usersTableName,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName, true, true, true);
  }
}
