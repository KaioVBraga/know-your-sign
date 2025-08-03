import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollOptionModule } from '../polloption/polloption.module';
import { PollVoteEntity } from './pollovote.entity';
import { PollVoteController } from './pollvote.controller';
import { PollVoteService } from './pollvote.service';

@Module({
  imports: [TypeOrmModule.forFeature([PollVoteEntity]), PollOptionModule],
  providers: [PollVoteService],
  exports: [PollVoteService],
  controllers: [PollVoteController],
})
export class PollVoteModule {}
