import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";
import { IsEqualTo } from "src/services/decorators/is-equal.decorator";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 12, { message: 'Username must be between 8 and 12 characters' })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 0
  })
  password: string;

  @ApiProperty()
  @IsEqualTo('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
