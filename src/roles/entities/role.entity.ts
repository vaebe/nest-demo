import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Menu } from '../../menus/entities/menu.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  @Column()
  code: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @ManyToMany(() => Menu, (menu) => menu.role)
  menus: Menu;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
