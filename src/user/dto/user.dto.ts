import { Equals, IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @Equals('password')
  @IsNotEmpty()
  @IsString()
  passwordConfirmation: string;
}

export class UpdateUserDto extends UserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @IsOptional()
  @IsNotEmpty()
  @Equals('passwordConfirmation')
  @Length(6, undefined)
  password: string;

  @IsOptional()
  @Equals('password')
  passwordConfirmation: string;
}
