import { Controller, Get, Query } from '@nestjs/common';
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
   * - type: 'boolean' or 'multiple'
   */
  @Get('questions')
  async getQuestions(
    @Query('amount') amount?: string,
    @Query('difficulty') difficulty?: string,
    @Query('category') category?: string,
    @Query('type') type?: string,
  ): Promise<TriviaQuestionDto[]> {
    // Parse query parameters and set defaults
    const amt = amount ? parseInt(amount) : 10;
    const cat = category ? parseInt(category) : undefined;
    const qType = type === 'multiple' ? 'multiple' : 'boolean';

    // Delegate fetching to TriviaService
    return this.triviaService.fetchQuestions(amt, difficulty, cat, qType);
  }
}
