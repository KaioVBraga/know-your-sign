import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Poll } from '../../../poll/interfaces/poll.interface';

export class CreatePollOptionDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  content: string;

  @IsNumber()
  @IsOptional()
  pollId: number;

  @Type(() => CreatePollOptionDto)
  @IsOptional()
  poll?: CreatePollOptionDto | Poll;
}
