import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPort,
  IsPositive,
  IsString,
} from 'class-validator';

export class GenerateSentenceDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  levels?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  topics?: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  minLength?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxLength?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tenses?: string[];

  @IsOptional()
  @IsString()
  lang?: string;
}
