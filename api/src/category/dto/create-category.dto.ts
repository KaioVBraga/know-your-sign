import { Auditable } from '../../base/audit.interface';
import { Category } from '../interfaces/category.interface';
import { IsString } from 'class-validator';

export class CreateCategoryDto implements Omit<Category, keyof Auditable> {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}
