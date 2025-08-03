import { IsNumber } from 'class-validator';

export class CreatePollCategoryDto {
  @IsNumber()
  id: number;
}
