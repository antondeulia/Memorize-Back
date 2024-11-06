import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { CheckDto } from './dtos/check.dto';
import { GenerateSentenceDto } from './dtos/generate-sentence.dto';

@Controller('practice')
export class PracticeController {
  constructor(private readonly practiceService: PracticeService) {}

  @Post()
  async generateSentence(@Body() dto: GenerateSentenceDto) {
    return await this.practiceService.generateSentence(dto);
  }

  @Post('check')
  async check(@Body() dto: CheckDto) {
    return await this.practiceService.check(dto);
  }
}
