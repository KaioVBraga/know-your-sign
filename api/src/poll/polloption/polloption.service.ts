import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePollOptionDto } from './dto/create-poll-option.dto';
import { PollOptionEntity } from './polloption.entity';
import { BulkHandlerService } from '../../base/bulkhandler.service';

@Injectable()
export class PollOptionService extends BulkHandlerService<
  PollOptionEntity,
  CreatePollOptionDto
> {
  constructor(
    @InjectRepository(PollOptionEntity)
    private pollOptionsRepository: Repository<PollOptionEntity>,
  ) {
    super();
  }

  async findAll(): Promise<PollOptionEntity[]> {
    return this.pollOptionsRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async create(
    createPollOptionDto: CreatePollOptionDto,
  ): Promise<PollOptionEntity> {
    const newPollOption: PollOptionEntity =
      this.pollOptionsRepository.create(createPollOptionDto);

    return this.pollOptionsRepository.save(newPollOption);
  }

  async findOneOrThrow(id: number): Promise<PollOptionEntity> {
    const poll = await this.pollOptionsRepository.findOneBy({ id });

    if (!poll) {
      throw new HttpException(
        'PollOptionEntity not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return poll;
  }

  async update(
    id: number,
    createPollOptionDto: CreatePollOptionDto,
  ): Promise<PollOptionEntity> {
    const poll = await this.findOneOrThrow(id);

    Object.assign(poll, createPollOptionDto);

    return await this.pollOptionsRepository.save(poll);
  }

  async delete(id: number): Promise<any> {
    await this.findOneOrThrow(id);

    const result = await this.pollOptionsRepository.delete(id);

    return result;
  }
}
