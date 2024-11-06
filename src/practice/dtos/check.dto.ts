import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CheckDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  userText: string;
}
