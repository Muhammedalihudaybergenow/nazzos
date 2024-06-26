import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const tableName = 'roles_permissions';
const rolesTableName = 'roles';
const permissionsTableName = 'permissions';
export class CreateRolesPermissionsTable1703563838689
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'role_id',
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
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: rolesTableName,
          },
          {
            columnNames: ['permission_id'],
            referencedColumnNames: ['id'],
            referencedTableName: permissionsTableName,
          },
        ],
        indices: [
          {
            columnNames: ['permission_id'],
          },
          {
            columnNames: ['role_id'],
          },
          {
            columnNames: ['permission_id', 'role_id'],
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
