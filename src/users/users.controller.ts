import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundError } from 'rxjs';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guards';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = await this.usersService.findOne(username);
    if(!user) {
      throw new NotFoundException(`User ${username} not found`);;
    }
    delete user.password;
    return user;
  }
}
