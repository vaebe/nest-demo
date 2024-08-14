import { HttpException, Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private readonly logsRepository: Repository<Log>,
  ) {}

  create(createLogDto: CreateLogDto) {
    const menu = this.logsRepository.create(createLogDto);
    return this.logsRepository.save(menu);
  }

  findAll() {
    return this.logsRepository.find();
  }

  findOne(id: number) {
    return this.logsRepository.findOneBy({ id });
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return this.logsRepository.update(id, updateLogDto);
  }

  async remove(id: number) {
    const info = await this.logsRepository.softDelete(id);

    if (info.affected === 0) {
      throw new HttpException('data not found', 200);
    }
    return info;
  }
}
