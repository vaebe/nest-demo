import { IsString, IsNotEmpty, Length } from 'class-validator';
export class AuthSignInDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
