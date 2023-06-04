import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { Challenge } from './entities/challenge.entity';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private challengeService: ChallengesService) {}

  @Post()
  create(@Body() challenge: CreateChallengeDto): Promise<Challenge> {
    return this.challengeService.create(challenge);
  }

  @Get()
  findAll(): Promise<Challenge[]> {
    return this.challengeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Challenge> {
    return this.challengeService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.challengeService.remove(id);
  }
}
