import { IsOptional, IsString } from "class-validator";

export class FilterArticleDto {
  @IsOptional()
  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;
}
