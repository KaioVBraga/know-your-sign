import { IsString } from 'class-validator';
import { BaseDto } from '../../base/base.dto';

export class CreateUserDto extends BaseDto {
  @IsString()
  name: string;

  @IsString()
  nickName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
