import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BulkHandlerService } from '../../base/bulkhandler.service';
import { CreatePollVoteDto } from './dto/create-poll-vote.dto';
import { PollVoteEntity } from './pollovote.entity';
import { PollEntity } from '../poll.entity';
import { PollOptionService } from '../polloption/polloption.service';
import { PollOptionEntity } from '../polloption/polloption.entity';

@Injectable()
export class PollVoteService extends BulkHandlerService<
  PollVoteEntity,
  CreatePollVoteDto
> {
  constructor(
    @InjectRepository(PollVoteEntity)
    private pollVotesRepository: Repository<PollVoteEntity>,
    private readonly pollOptionService: PollOptionService,
  ) {
    super();
  }

  async findAll(): Promise<PollVoteEntity[]> {
    return this.pollVotesRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async create(createPollVoteDto: CreatePollVoteDto): Promise<PollVoteEntity> {
    const pollOption: PollOptionEntity =
      await this.pollOptionService.findOneOrThrow(
        createPollVoteDto.pollOptionId,
      );

    createPollVoteDto.pollId = pollOption.pollId;

    const newPollVote: PollVoteEntity =
      this.pollVotesRepository.create(createPollVoteDto);

    return this.pollVotesRepository.save(newPollVote);
  }

  async findOneOrThrow(id: number): Promise<PollVoteEntity> {
    const poll = await this.pollVotesRepository.findOneBy({ id });

    if (!poll) {
      throw new HttpException('PollVoteEntity not found', HttpStatus.NOT_FOUND);
    }

    return poll;
  }

  async update(
    id: number,
    createPollVoteDto: CreatePollVoteDto,
  ): Promise<PollVoteEntity> {
    const poll = await this.findOneOrThrow(id);

    Object.assign(poll, createPollVoteDto);

    return await this.pollVotesRepository.save(poll);
  }

  async delete(id: number): Promise<any> {
    await this.findOneOrThrow(id);

    const result = await this.pollVotesRepository.delete(id);

    return result;
  }
}
