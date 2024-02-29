import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { NotFoundError } from 'rxjs';
import { JwtAuthGuard } from 'src/services/auth/guards/jwt.guards';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  async findOne(@Req() request, @Param('username') username: string) {
    const authenticatedUser = request.user;
    if(authenticatedUser.username !== username) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOne(username);
    delete user.password;
    return user;
  }
}
