import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './entities/challenge.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
  ) {}

  create(challenge: CreateChallengeDto): Promise<Challenge> {
    this.challengeRepository.create(challenge);
    return;
  }

  findAll(): Promise<Challenge[]> {
    return this.challengeRepository.find();
  }

  findOne(id: number): Promise<Challenge> {
    return this.challengeRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.challengeRepository.delete(id);
  }
}
