import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  passwordConfirmation: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @IsOptional()
  @IsNotEmpty()
  @Length(6, undefined)
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  passwordConfirmation: string;
}
