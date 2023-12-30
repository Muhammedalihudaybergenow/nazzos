import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { LangEnum, UserStatusEnum } from 'src/common/enums';
import { SuperUserInterface } from 'src/orm/seeds/interfaces';
import { UserEntity } from 'src/modules/manager/manager-users/entities';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';
import { DateHelper, HashHelper } from 'src/common/helpers';
const superUser: SuperUserInterface = {
  firstName: 'Muhammedali',
  isSuperUser: true,
  lang: LangEnum.ENGLISH,
  lastName: 'Hudaybergenow',
  phonenumber: '63412114',
  password: 'Hello123',
};
export class SuperUserSeed implements Seeder {
  track?: boolean;
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(UserEntity);
    const roleRepository = dataSource.getRepository(RoleEntity);
    const superUserCheck = await userRepository.findOneBy({
      isSuperUser: true,
    });
    const manager = await roleRepository.findOneBy({
      slug: 'manager',
    });
    if (!superUserCheck) {
      const superUserEntity = new UserEntity({
        firstName: superUser.firstName,
        lastName: superUser.lastName,
        isSuperUser: true,
        password: await HashHelper.getHash(superUser.password),
        lang: superUser.lang,
        phonenumber: superUser.phonenumber,
        roles: [manager],
        status: UserStatusEnum.ACTIVE,
        createdAt: DateHelper.getCurrentTime(),
        loginAt: DateHelper.getCurrentTime(),
      });
      await userRepository.save(superUserEntity);
    }
  }
}
