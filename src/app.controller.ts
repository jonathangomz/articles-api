import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { LoginUserDto } from './users/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/signup')
  signup (@Body() newUser: CreateUserDto) {
    return this.authService.signup(newUser);
  }

  @Post('auth/login')
  login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }
}
