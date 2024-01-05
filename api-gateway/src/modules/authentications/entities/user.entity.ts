import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from 'src/modules/authentications/entities';
import { PermissionEntity } from 'src/modules/authentications/entities';
import { LangEnum, UserStatusEnum } from 'src/common/enums';
@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'phonenumber',
    type: 'varchar',
    nullable: false,
  })
  phonenumber: number;

  @Column({
    name: 'lang',
    type: 'integer',
    nullable: false,
  })
  lang: LangEnum;

  @Column({
    name: 'is_super_user',
    type: 'boolean',
    nullable: false,
  })
  isSuperUser: boolean;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'status',
    type: 'integer',
    nullable: false,
  })
  status: UserStatusEnum;

  @Column({
    name: 'created_at',
    type: 'bigint',
    nullable: false,
  })
  createdAt: number;

  @Column({
    name: 'login_at',
    type: 'bigint',
    nullable: false,
  })
  loginAt: number;

  @ManyToMany(() => RoleEntity, (roles) => roles.users)
  roles: RoleEntity[];

  @ManyToMany(() => PermissionEntity, (permissions) => permissions.users)
  permissions: PermissionEntity[];

  constructor(entity?: Partial<UserEntity>) {
    Object.assign(this, entity);
  }
}
