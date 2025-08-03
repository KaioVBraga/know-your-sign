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
import { CreatePollDto } from './dto/create-poll.dto';
import { PollService } from './poll.service';
import { AuthGuard } from '../auth/auth.guard';
import { isInstance } from 'class-validator';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Get()
  async findAll() {
    return this.pollService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: number) {
  //   return this.pollService.findOneOrThrow(id);
  // }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.pollService.findBySlugOrThrow(slug);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createUserDto: CreatePollDto) {
    console.log(`POST /polls with [${createUserDto.toString()}]`);

    createUserDto.userId = req.user.id;
    return this.pollService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Request() req,
    @Body() createUserDto: CreatePollDto,
  ) {
    console.log(`PUT /polls/${id} with [${createUserDto.toString()}]`);

    createUserDto.userId = req.user.id;
    return this.pollService.update(id, createUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.pollService.delete(id);
  }
}
