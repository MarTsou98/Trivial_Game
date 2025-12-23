import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { TriviaService } from './trivia.service';
import { TriviaQuestionDto } from './dto/trivia-question.dto';

@Controller('trivia')
export class TriviaController {
  constructor(private readonly triviaService: TriviaService) {}

  /**
   * GET /trivia/questions
   * Returns trivia questions from the service.
   * Optional query parameters:
   * - amount: number of questions (default 10)
   * - difficulty: 'easy' | 'medium' | 'hard'
   * - category: numeric category ID
   * - type: 'boolean' | 'multiple'
   */
  @Get('questions')
  async getQuestions(
    @Query('amount', new DefaultValuePipe(10), ParseIntPipe) amount: number,
    @Query('difficulty') difficulty?: 'easy' | 'medium' | 'hard',
    @Query('category', new DefaultValuePipe(undefined), ParseIntPipe)
    category?: number,
    @Query('type') type?: 'boolean' | 'multiple',
  ): Promise<TriviaQuestionDto[]> {
    const questionType = type === 'multiple' ? 'multiple' : 'boolean';
    return this.triviaService.fetchQuestions(
      amount,
      difficulty,
      category,
      questionType,
    );
  }
}
