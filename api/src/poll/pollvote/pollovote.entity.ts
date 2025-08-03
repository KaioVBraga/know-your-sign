import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../base/audit.entity';
import { PollEntity } from '../poll.entity';
import { UserEntity } from '../../user/user.entity';
import { PollOptionEntity } from '../polloption/polloption.entity';

@Entity('poll_vote')
export class PollVoteEntity extends AuditableEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'poll_id', nullable: false })
  pollId: number;

  @ManyToOne(() => PollEntity, (poll) => poll.votes)
  @JoinColumn({ name: 'poll_id' })
  poll: PollEntity;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.votes)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'poll_option_id', nullable: false })
  pollOptionId: number;

  @ManyToOne(() => PollOptionEntity, (pollOption) => pollOption.votes)
  @JoinColumn({ name: 'user_id' })
  pollOption: PollOptionEntity;
}
