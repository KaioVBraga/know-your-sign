import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '../category/category.service';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreatePollCategoryDto } from './dto/create-poll-category.dto';
import { CreatePollDto } from './dto/create-poll.dto';
import { Poll } from './interfaces/poll.interface';
import { PollEntity } from './poll.entity';
import { CreatePollOptionDto } from './polloption/dto/create-poll-option.dto';
import { PollOptionService } from './polloption/polloption.service';
import { mergeObjects } from '../utils/objects';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(PollEntity)
    private pollsRepository: Repository<PollEntity>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly pollOptionService: PollOptionService,
  ) {}

  async findAll(): Promise<Poll[]> {
    return this.pollsRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async setupUser(poll: Poll, userId: number) {
    poll.user = await this.userService.findOneOrThrow(userId);
  }

  async setupCategories(poll: Poll, categories: CreatePollCategoryDto[]) {
    const categoryIds = categories.map((c) => c.id);
    poll.categories = await this.categoryService.findByIds(categoryIds);
  }

  async setupPollOptions(poll: Poll, options: CreatePollOptionDto[]) {
    options.forEach((o) => {
      o.pollId = poll.id;
    });

    poll.options = await this.pollOptionService.bulkCreate(options);
  }

  async handlePollOptions(poll: Poll, options: CreatePollOptionDto[]) {
    const existingOptions = poll.options || [];

    poll.options = await this.pollOptionService.bulkOperate(
      options,
      existingOptions,
      { pollId: poll.id },
    );
  }

  async create(createPollDto: CreatePollDto): Promise<Poll> {
    const newPoll: Poll = this.pollsRepository.create(createPollDto);

    const poll = await this.pollsRepository.save(newPoll);

    await this.setupUser(poll, createPollDto.userId);
    await this.setupCategories(poll, createPollDto.categories);
    await this.setupPollOptions(poll, createPollDto.options);

    return this.pollsRepository.save(poll);
  }

  async findOneOrThrow(id: number): Promise<Poll> {
    const poll = await this.pollsRepository.findOneBy({ id });

    if (!poll) {
      throw new HttpException('Poll not found', HttpStatus.NOT_FOUND);
    }

    return poll;
  }

  async findBySlugOrThrow(slug: string): Promise<Poll> {
    const poll = await this.pollsRepository.findOneBy({ slug });

    if (!poll) {
      throw new HttpException('Poll not found', HttpStatus.NOT_FOUND);
    }

    return poll;
  }

  async update(id: number, createPollDto: CreatePollDto): Promise<Poll> {
    const poll = await this.findOneOrThrow(id);

    if (poll.user?.id !== createPollDto.userId) {
      throw new HttpException(
        'Poll does not belong to you',
        HttpStatus.UNAUTHORIZED,
      );
    }

    mergeObjects(poll, createPollDto, ['id', 'categories', 'options']);

    await this.setupCategories(poll, createPollDto.categories);
    await this.handlePollOptions(poll, createPollDto.options);

    // poll.options.forEach((o) => {
    //   o.poll = poll as PollEntity;
    //   o.pollId = poll.id;
    // });

    // poll.options = [];

    console.log('About to save poll - ', poll);

    return await this.pollsRepository.save(poll);
  }

  async delete(id: number): Promise<any> {
    await this.findOneOrThrow(id);

    return await this.pollsRepository.delete(id);
  }
}
