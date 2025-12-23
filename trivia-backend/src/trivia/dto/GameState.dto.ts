import { IsString, IsArray, IsOptional, IsIn } from 'class-validator';

export class GameStateDto {
  @IsString()
  gameId: string;

  @IsArray()
  @IsIn(['X', 'O', null], { each: true })
  board: ('X' | 'O' | null)[];

  @IsIn(['X', 'O'])
  currentPlayer: 'X' | 'O';

  @IsOptional()
  @IsIn(['X', 'O', 'draw'])
  winner?: 'X' | 'O' | 'draw';
}
