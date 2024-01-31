import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddBookDto {
  @ApiProperty({ description: 'Title of the book' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Author of the book' })
  @IsNotEmpty()
  @IsString()
  author: string;

//   @ApiProperty({ description: 'Published date of the book in YYYY-MM-DD or YYYY/MM/DD format' })
//   @IsNotEmpty()
//   @Transform(({ value }) => new Date(value))
//   publishedDate: Date;

@ApiProperty({
    description: 'Published date of the book in YYYY-MM-DD format',
    example: '2022-01-30',
  })
  @IsNotEmpty()
  @IsDateString()
  @Transform(({ value }) => value.toISOString().split('T')[0])
  publishedDate: Date;
}
