export type PlayerSymbol = 'X' | 'O';

export interface TriviaLock {
  questionId: string;
  correctAnswer: string;
  expiresAt: Date;
}

export interface TicTacToePlayer {
  id: string;
  symbol: PlayerSymbol;
}

export interface TicTacToeGame {
  id: string;
  board: (PlayerSymbol | null)[];
  players: TicTacToePlayer[];
  currentTurn: PlayerSymbol;
  status: 'waiting' | 'in_progress' | 'finished';
  winner?: PlayerSymbol | 'draw';

  answeredQuestions: number;

  activeTrivia?: TriviaLock; // ✅ THIS LINE

  createdAt: Date;
}
