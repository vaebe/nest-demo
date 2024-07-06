import { HttpException, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menusRepository: Repository<Menu>,
  ) {}

  create(createMenuDto: CreateMenuDto) {
    const menu = this.menusRepository.create(createMenuDto);
    return this.menusRepository.save(menu);
  }

  findAll() {
    return this.menusRepository.find();
  }

  findOne(id: number) {
    return this.menusRepository.findOneBy({ id });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.menusRepository.update(id, updateMenuDto);
  }

  async remove(id: number) {
    const info = await this.menusRepository.softDelete(id);

    if (info.affected === 0) {
      throw new HttpException('data not found', 200);
    }

    return info;
  }
}
