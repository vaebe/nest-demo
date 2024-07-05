import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../../roles/entities/role.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  order: number;

  @Column()
  acl: string;

  @ManyToMany(() => Roles, (roles) => roles.menus)
  @JoinTable({
    name: 'menus_roles',
    joinColumn: {
      name: 'menus_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_code',
      referencedColumnName: 'code',
    },
  })
  role: Roles;
}
