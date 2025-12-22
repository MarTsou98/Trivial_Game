import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TriviaQuestionDto } from './dto/trivia-question.dto';

@Injectable()
export class TriviaService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Fetches trivia questions from Open Trivia DB based on the given parameters.
   * Returns an array of TriviaQuestionDto objects.
   */
  async fetchQuestions(
    amount = 10,
    difficulty?: string,
    category?: number,
    type = 'boolean',
  ): Promise<TriviaQuestionDto[]> {
    try {
      // Build API URL with required and optional query parameters
      let url = `https://opentdb.com/api.php?amount=${amount}&type=${type}`;
      if (difficulty) url += `&difficulty=${difficulty}`;
      if (category) url += `&category=${category}`;

      // Execute HTTP request and unwrap the observable
      const response = await firstValueFrom(
        this.httpService.get<{ results: TriviaQuestionDto[] }>(url),
      );

      // Return only the 'results' array from the API response
      return response.data.results;
    } catch (error) {
      console.error(error);
      // Throw a 500 if the external API request fails
      throw new InternalServerErrorException(
        'Failed to fetch trivia questions',
      );
    }
  }
}
