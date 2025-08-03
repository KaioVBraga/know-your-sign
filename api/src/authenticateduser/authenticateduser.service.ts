import { Injectable } from '@nestjs/common';
import { PublicUserDto } from '../user/dto/public-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticatedUserService {
  constructor(private usersService: UserService) {}

  async getProfile(userId: number): Promise<PublicUserDto> {
    const user = await this.usersService.findOneOrThrow(userId);

    return PublicUserDto.fromUser(user);
  }
}
