import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollEntity } from './poll.entity';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { PollOptionModule } from './polloption/polloption.module';
import { PollVoteModule } from './pollvote/pollvote.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PollEntity]),
    UserModule,
    AuthModule,
    CategoryModule,
    PollOptionModule,
  ],
  providers: [PollService],
  controllers: [PollController],
})
export class PollModule {}
