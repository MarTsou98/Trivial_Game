// src/tic-tac-toe/tic-tac-toe-game.model.ts

export type PlayerSymbol = 'X' | 'O';

export interface TriviaLock {
  questionId: string;
  correctAnswer: string;
  expiresAt: Date;
}

export interface Player {
  id: string;
  symbol: PlayerSymbol;
}

export interface TicTacToeGame {
  id: string;
  board: (PlayerSymbol | null)[];
  players: Player[];
  currentTurn: PlayerSymbol;
  winner?: PlayerSymbol | 'draw';
  status: 'waiting' | 'in_progress' | 'finished';

  questionsPerGame: number;
  answeredQuestions: number;

  activeTrivia?: TriviaLock;

  createdAt: Date;
}
