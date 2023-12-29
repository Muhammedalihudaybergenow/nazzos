import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';
import { PermissionEntity } from 'src/modules/manager/manager-permissions/entities';
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
  phonenumber: string;

  @Column({
    name: 'lang',
    type: 'varchar',
    nullable: false,
  })
  lang: string;

  @Column({
    name: 'is_super_user',
    type: 'boolean',
    nullable: false,
  })
  isSuperUser: boolean;

  @ManyToMany(() => RoleEntity, (roles) => roles.users)
  roles: RoleEntity[];

  @ManyToMany(() => PermissionEntity, (permissions) => permissions.users)
  permissions: PermissionEntity[];
}
