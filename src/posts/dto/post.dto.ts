import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(600)
  content: string;
}
