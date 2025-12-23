// src/trivia/dto/create-game.dto.ts
import { IsEnum, IsInt, IsOptional, Min, Max, IsString } from 'class-validator';

export enum TriviaDifficulty {
  ANY = 'any',
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum TriviaType {
  ANY = 'any',
  MULTIPLE = 'multiple',
  BOOLEAN = 'boolean',
}

export class CreateGameDto {
  @IsInt()
  @Min(1)
  @Max(20)
  questionsPerGame: number;

  @IsOptional()
  @IsInt()
  category?: number;

  @IsEnum(TriviaDifficulty)
  difficulty: TriviaDifficulty;

  @IsEnum(TriviaType)
  type: TriviaType;

  @IsString()
  playerId: string;
}
