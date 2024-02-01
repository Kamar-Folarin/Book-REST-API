import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BookDto {

    @ApiProperty({ description: 'Database generated Id of the book' })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ description: 'Title of the book' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'Author of the book' })
    @IsNotEmpty()
    @IsString()
    author: string;


    @ApiProperty({
        description: 'Published date of the book in YYYY-MM-DD format',
        example: '2022-01-30',
    })
    @IsNotEmpty()
    @IsDateString()
    @Transform(({ value }) => value.toISOString().split('T')[0])
    publishedDate: Date;
}
