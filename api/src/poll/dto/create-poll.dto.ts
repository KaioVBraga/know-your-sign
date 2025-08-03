import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreatePollCategoryDto } from './create-poll-category.dto';
import { Type } from 'class-transformer';
import { BaseDto } from '../../base/base.dto';
import { CreatePollOptionDto } from '../polloption/dto/create-poll-option.dto';

export class CreatePollDto extends BaseDto {
  @IsString()
  image: string;

  @IsString()
  content: string;

  @IsString()
  slug: string;

  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePollCategoryDto)
  categories: CreatePollCategoryDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePollOptionDto)
  options: CreatePollOptionDto[];
}
