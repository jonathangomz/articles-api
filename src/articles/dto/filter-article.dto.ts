import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class FilterArticleDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  author: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content: string;
}
