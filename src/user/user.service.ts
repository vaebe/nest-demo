import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    user.password = await argon2.hash(user.password);

    // 注册、新增的用户均为普通用户
    user.roles = [await this.roleService.findOneByCode('normal_user')];

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['roles', 'profile'], // 指定要加载的关联关系
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'profile'], // 指定要加载的关联关系
    });
  }

  findOneByName(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const info = await this.userRepository.softDelete(id);

    if (info.affected === 0) {
      throw new HttpException('data not found', 200);
    }
    return info;
  }
}
