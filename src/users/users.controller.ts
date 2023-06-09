import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Public()
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
