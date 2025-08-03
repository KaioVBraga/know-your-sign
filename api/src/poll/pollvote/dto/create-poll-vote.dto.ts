import { IsNumber, IsOptional } from 'class-validator';

export class CreatePollVoteDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  pollOptionId: number;

  pollId: number;
  userId: number;
}
