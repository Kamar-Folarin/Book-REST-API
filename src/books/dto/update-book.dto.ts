import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsDateString()
  publishedDate?: Date;
}
