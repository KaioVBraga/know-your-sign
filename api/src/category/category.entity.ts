import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from './interfaces/category.interface';
import { AuditableEntity } from '../base/audit.entity';
import { PollEntity } from '../poll/poll.entity';
import { Poll } from '../poll/interfaces/poll.interface';

@Entity('category')
export class CategoryEntity extends AuditableEntity implements Category {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'slug' })
  slug: string;

  @ManyToMany(() => PollEntity)
  @JoinTable({
    name: 'poll_category',
    joinColumn: { name: 'category_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'poll_id', referencedColumnName: 'id' },
  })
  categories: PollEntity[];
}
