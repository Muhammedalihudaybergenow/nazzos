import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntity } from 'src/modules/authentications/entities';
import { UserEntity } from 'src/modules/authentications/entities';
@Entity({
  name: 'roles',
})
export class RoleEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'slug',
    type: 'varchar',
    nullable: false,
  })
  slug: string;

  @ManyToMany(() => PermissionEntity, (permissions) => permissions.roles)
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionEntity[];

  @ManyToMany(() => UserEntity, (users) => users.roles)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];

  constructor(entity?: Partial<RoleEntity>) {
    Object.assign(this, entity);
  }
}
