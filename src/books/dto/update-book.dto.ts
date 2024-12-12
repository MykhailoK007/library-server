import { IsDate, IsInt, IsOptional, MaxLength } from 'class-validator';
export class UpdateBookDto {
  @IsOptional()
  @MaxLength(100, {
    message:
      'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  title?: string;

  @IsOptional()
  author?: string;

  @IsOptional()
  @MaxLength(250, {
    message:
      'Description is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  description?: string;

  @IsOptional()
  @IsDate()
  publishDate?: string;

  @IsOptional()
  @IsInt()
  pages?: number;
}
