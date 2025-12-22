export class TriviaQuestionDto {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];

  // optional field for frontend convenience
  options?: string[];
}

export class TriviaApiResponseDto {
  response_code: number;
  results: TriviaQuestionDto[];
}
