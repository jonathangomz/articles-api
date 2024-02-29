import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from "class-validator";
import { IsEqualTo } from "src/services/decorators/is-equal.decorator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 12, { message: 'Username must be between 8 and 12 characters' })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 0
  })
  password: string;

  @IsEqualTo('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
