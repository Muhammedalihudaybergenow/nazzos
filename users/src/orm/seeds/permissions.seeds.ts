import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PermissionInterface } from 'src/orm/seeds/interfaces';
import { PermissionEntity } from 'src/modules/manager/manager-permissions/entities/permission.entity';
const permissionSeeds: PermissionInterface[] = [
  {
    name: 'Manager Users Create',
    slug: 'manager.users.users.create',
  },
  {
    name: 'Manager Users Update',
    slug: 'manager.users.users.update',
  },
  {
    name: 'Manager Users Delete',
    slug: 'manager.users.users.delete',
  },
  {
    name: 'Manager Users Read All',
    slug: 'manager.users.users.readall',
  },
  {
    name: 'Manager Users Read One',
    slug: 'manager.users.users.readone',
  },
  {
    name: 'Manager Role Create',
    slug: 'manager.users.roles.create',
  },
  {
    name: 'Manager Roles Update',
    slug: 'manager.users.roles.update',
  },
  {
    name: 'Manager Roles Delete',
    slug: 'manager.users.roles.delete',
  },
  {
    name: 'Manager Roles Read All',
    slug: 'manager.users.roles.readall',
  },
  {
    name: 'Manager Roles Read One',
    slug: 'manager.users.roles.readone',
  },
  {
    name: 'Manager Permissions Create',
    slug: 'manager.users.permissions.create',
  },
  {
    name: 'Manager Permissions Update',
    slug: 'manager.users.permissions.update',
  },
  {
    name: 'Manager Permissions Delete',
    slug: 'manager.users.permissions.delete',
  },
  {
    name: 'Manager Permissions Read All',
    slug: 'manager.users.permissions.readall',
  },
  {
    name: 'Manager Permissions Read One',
    slug: 'manager.users.permissions.readone',
  },
];
export class PermissionSeeds implements Seeder {
  track?: boolean;
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const permissionRepository = dataSource.getRepository(PermissionEntity);
    const permissions = await permissionRepository.find();
    const newPermissions: PermissionEntity[] = [];
    permissionSeeds.forEach((permissionSeed) => {
      const permissionCheck = permissions.find(
        (permission) => permission.slug === permissionSeed.slug,
      );
      if (!permissionCheck) {
        newPermissions.push(
          new PermissionEntity({
            name: permissionSeed.name,
            slug: permissionSeed.slug,
          }),
        );
      }
    });
    if (newPermissions.length) {
      await permissionRepository.save(newPermissions);
    }
  }
}
