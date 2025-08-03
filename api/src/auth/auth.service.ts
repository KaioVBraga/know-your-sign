import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PublicUserDto } from '../user/dto/public-user.dto';
import { User } from '../user/interfaces/user.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async createJwtToken(user: User) {
    const payload = { id: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
      user: PublicUserDto.fromUser(user),
    };
  }

  validatePassword(user: User, password: string) {
    // TODO: Encrypt password
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
  }

  async login(email: string, password: string): Promise<LoginDto> {
    const user = await this.usersService.findByEmailOrThrow(email);

    this.validatePassword(user, password);

    return this.createJwtToken(user);
  }

  async register(userToRegister: CreateUserDto): Promise<LoginDto> {
    const user = await this.usersService.create(userToRegister);

    return this.createJwtToken(user);
  }
}
