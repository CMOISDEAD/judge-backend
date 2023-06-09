import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    // TODO: encript user password before compare.
    const user = await this.userService.findOneByUsername(username);
    if (user?.password !== password) throw new UnauthorizedException();
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(user: RegisterDto): Promise<any> {
    // TODO: encript user password before create.
    const verify = await this.userService.findOneByUsername(user.username);
    if (verify !== null) throw new UnauthorizedException();
    const newUser = await this.userService.create(user as CreateUserDto);
    const payload = {
      sub: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
