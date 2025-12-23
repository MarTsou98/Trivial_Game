// src/trivia/dto/make-move.dto.ts
import { IsInt, IsString, Min, Max } from 'class-validator';

export class MakeMoveDto {
  @IsString()
  gameId: string;

  @IsInt()
  @Min(0)
  @Max(8)
  cellIndex: number;

  @IsString()
  selectedAnswer: string;

  @IsString()
  playerId: string;
}
