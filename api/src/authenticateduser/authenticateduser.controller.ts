import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticatedUserService } from './authenticateduser.service';

@Controller('authenticated-user')
export class AuthenticatedUserController {
  constructor(private authenticatedUserService: AuthenticatedUserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.info('Received request to profile');
    return this.authenticatedUserService.getProfile(req.user.id);
  }
}
