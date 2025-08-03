import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollOptionEntity } from './polloption.entity';
import { PollOptionService } from './polloption.service';

@Module({
  imports: [TypeOrmModule.forFeature([PollOptionEntity])],
  providers: [PollOptionService],
  exports: [PollOptionService],
})
export class PollOptionModule {}
