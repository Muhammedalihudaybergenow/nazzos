import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { ManagerRoleInterface } from 'src/orm/seeds/interfaces';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';

const roleSeeds: ManagerRoleInterface[] = [
  {
    name: 'Manager Role',
    slug: 'manager',
  },
];
export class RoleSeeds implements Seeder {
  track?: boolean;
  async run(dataSource: DataSource): Promise<any> {
    const roleRepository = dataSource.getRepository(RoleEntity);
    const roles = await roleRepository
      .createQueryBuilder('role')
      .where('role.slug IN (:slugs)', {
        slugs: roleSeeds.map((roleSeed) => roleSeed.slug),
      })
      .getMany();
    const newRoleEntities: RoleEntity[] = [];

    roleSeeds.forEach((roleSeed) => {
      const roleCheck = roles.find((role) => role.slug === roleSeed.slug);
      if (!roleCheck) {
        newRoleEntities.push(
          new RoleEntity({
            name: roleSeed.name,
            slug: roleSeed.slug,
          }),
        );
      }
    });
    if (newRoleEntities.length) {
      const roles = await roleRepository.save(newRoleEntities);
    }
  }
}
