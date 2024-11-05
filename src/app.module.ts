import { Module } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PracticeModule } from './practice/practice.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PracticeModule],
  providers: [
    {
      provide: OpenAI,
      useFactory: (config: ConfigService) =>
        new OpenAI({ apiKey: config.getOrThrow('OPENAI_API_KEY') }),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
