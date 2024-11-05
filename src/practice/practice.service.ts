import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { CheckDto } from './dtos/check.dto';
import { ChatCompletionMessage } from 'openai/resources';
import { GenerateSentenceDto } from './dtos/generate-sentence.dto';
import { openAiModel } from 'src/constants';

@Injectable()
export class PracticeService {
  constructor(
    private readonly config: ConfigService,
    private readonly openAi: OpenAI,
  ) {
    this.openAi = new OpenAI({
      apiKey: this.config.getOrThrow('OPENAI_API_KEY'),
    });
  }

  async generateSentence(dto: GenerateSentenceDto): Promise<string> {
    const {
      lang = 'english',
      levels,
      minLength = 5,
      maxLength = 15,
      tenses,
      topics,
    } = dto;

    const res = await this.openAi.chat.completions.create({
      model: openAiModel,
      messages: [
        {
          role: 'system',
          content: `Сгенерируй предложение на ${lang} языке;
          от ${minLength} до ${maxLength} слов;
          ${levels?.length ? `Уровень сложности: ${levels.map((level) => level)};` : 'Любой уровень сложности'}
          ${topics?.length ? `На темы: ${topics.map((topic) => topic)};` : 'На любую тему'}
          ${tenses?.length ? `Используя времена: ${tenses.map((tense) => tense)}` : 'В случайных временах'}`,
        },
      ],
    });

    return res.choices[0].message.content;
  }

  async check({ text, userText }: CheckDto): Promise<string> {
    const res = await this.openAi.chat.completions.create({
      model: openAiModel,
      messages: [
        {
          role: 'system',
          content: `Проверь перевод. Игнорируй граматические и орфографические ошибки и неправильность написания слов
                    Если перевод правильный, верни в начале true и напиши как было бы лучше перевести.
                    Если перевод неверный, верни в начале строки false и обясни почему.
          `,
        },
        {
          role: 'user',
          content: `Оригинальный текст: "${text}";
                    Перевод пользователя: "${userText}";
          `,
        },
      ],
      temperature: 0.5,
    });

    return res.choices[0].message.content;
  }
}
