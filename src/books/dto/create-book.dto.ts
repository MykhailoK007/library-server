import { IsDate, IsNotEmpty, IsInt, MaxLength } from 'class-validator';
export class CreateBookDto {
  @IsNotEmpty()
  @MaxLength(100, {
    message:
      'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  @MaxLength(250, {
    message:
      'Description is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  description: string;

  @IsNotEmpty()
  @IsDate()
  publishDate: string;

  @IsNotEmpty()
  @IsInt()
  pages: number;
}
