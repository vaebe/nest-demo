import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Length, IsNotEmpty, IsString } from 'class-validator';
import { Roles } from '../../roles/roles.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  roles?: Roles[];
}
