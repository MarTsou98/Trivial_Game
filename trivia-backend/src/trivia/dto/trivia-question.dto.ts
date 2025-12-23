// src/trivia/dto/trivia-question.dto.ts
import { IsString, IsArray, IsOptional, IsIn, IsNumber } from 'class-validator';

export class TriviaQuestionDto {
  @IsString()
  category: string;

  @IsString()
  @IsIn(['multiple', 'boolean'])
  type: 'multiple' | 'boolean';

  @IsString()
  difficulty: string;

  @IsString()
  question: string;

  @IsString()
  correct_answer: string;

  @IsArray()
  @IsString({ each: true })
  incorrect_answers: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];
}

export class TriviaApiResponseDto {
  @IsNumber()
  response_code: number;

  @IsArray()
  results: TriviaQuestionDto[];
}
