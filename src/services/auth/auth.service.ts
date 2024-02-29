import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private userService: UsersService,
    private jwtService: JwtService,
    ) {}

  async signup (newUser: CreateUserDto) {
    // Check if exist
    let user: User = await this.userService.findOne(newUser.username);
    if(user) {
      throw new BadRequestException(`An user with the email ${newUser.username} already exists`);
    }

    // Hash password
    const saltOrRounds: number = Number.parseInt(this.configService.get('SALT_OR_ROUNDS'));
    let hassedPassword: string = await bcrypt.hash(newUser.password, saltOrRounds);

    // Save
    await this.userService.create({
      ...newUser,
      password: hassedPassword,
    });

    return {
      username: newUser.username,
      email: newUser.email
    }
  }

  async login(loginUser: LoginUserDto) {
    // Check if exist
    const user = await this.userService.findOne(loginUser.username);
    if (user) {
      // Check password
      let passWordIsOk = await bcrypt.compare(loginUser.password, user.password);
      if(passWordIsOk) {
        // Sign jwt
        return {
          access_token: this.jwtService.sign({
            username: user.username,
            email: user.email,
          }),
        };
      }
    }

    throw new UnauthorizedException(`Wrong credentials`);
  }
}