import { Auditable } from '../../base/audit.interface';
import { Category } from '../../category/interfaces/category.interface';
import { User } from '../../user/interfaces/user.interface';
import { PollOptionEntity } from '../polloption/polloption.entity';

export interface Poll extends Auditable {
  image: string;
  content: string;
  slug: string;
  user?: User;
  categories: Category[];
  options: PollOptionEntity[];
  // comments: PollComment[];
}
