import { IsNumber, IsString } from 'class-validator';
import { User } from '../interfaces/user.interface';

export class PublicUserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  nickName: string;

  @IsString()
  email: string;

  static fromUser(user: User): PublicUserDto {
    const publicUser: PublicUserDto = new PublicUserDto();

    publicUser.id = user.id;
    publicUser.name = user.name;
    publicUser.nickName = user.nickName;
    publicUser.email = user.email;

    return publicUser;
  }
}
