import { IsArray, IsString, ValidateNested } from 'class-validator';
import { PublicUserDto } from '../../user/dto/public-user.dto';
import { Type } from 'class-transformer';
import { CreatePollCategoryDto } from '../../poll/dto/create-poll-category.dto';

export class LoginDto {
  @IsString()
  token: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePollCategoryDto)
  user: PublicUserDto;
}
