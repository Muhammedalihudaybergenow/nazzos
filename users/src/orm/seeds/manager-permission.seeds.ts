import { PermissionEntity } from 'src/modules/manager/manager-permissions/entities';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class ManagerPermissionSeed implements Seeder {
  track?: boolean;
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleRepository = dataSource.getRepository(RoleEntity);
    const permissionRepository = dataSource.getRepository(PermissionEntity);
    const managerRole = await roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .where('role.slug =:slug', { slug: 'manager' })
      .getOne();
    if (managerRole) {
      const permissions = await permissionRepository
        .createQueryBuilder('permissions')
        .getMany();
      managerRole.permissions = permissions;
      await roleRepository.save(managerRole);
    }
  }
}
