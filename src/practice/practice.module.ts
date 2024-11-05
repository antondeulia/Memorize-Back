import { Module } from '@nestjs/common';
import { PracticeService } from './practice.service';
import { PracticeController } from './practice.controller';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PracticeController],
  providers: [
    PracticeService,
    {
      provide: OpenAI,
      useFactory: (config: ConfigService) => {
        new OpenAI({ apiKey: config.getOrThrow('OPENAI_API_KEY') });
      },
      inject: [ConfigService],
    },
  ],
})
export class PracticeModule {}
