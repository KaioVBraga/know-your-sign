import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PollVoteService } from './pollvote.service';
import { CreatePollVoteDto } from './dto/create-poll-vote.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('poll-votes')
export class PollVoteController {
  constructor(private readonly PollVoteService: PollVoteService) {}

  @Get()
  async findAll() {
    return this.PollVoteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.PollVoteService.findOneOrThrow(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createPollVoteDto: CreatePollVoteDto) {
    console.log(`POST /votes with [${createPollVoteDto.toString()}]`);

    createPollVoteDto.userId = req.user.id;
    return this.PollVoteService.create(createPollVoteDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Request() req,
    @Body() createPollVoteDto: CreatePollVoteDto,
  ) {
    console.log(`PUT /votes/${id} with [${createPollVoteDto.toString()}]`);

    createPollVoteDto.userId = req.user.id;
    return this.PollVoteService.update(id, createPollVoteDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.PollVoteService.delete(id);
  }
}
