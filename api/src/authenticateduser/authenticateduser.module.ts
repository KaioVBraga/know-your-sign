import { Module } from '@nestjs/common';
import { AuthenticatedUserController } from './authenticateduser.controller';
import { AuthenticatedUserService } from './authenticateduser.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AuthenticatedUserController],
  providers: [AuthenticatedUserService],
  imports: [
    UserModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
})
export class AuthenticatedUserModule {}
