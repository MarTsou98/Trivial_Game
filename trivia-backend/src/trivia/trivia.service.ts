import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TriviaQuestionDto } from './dto/trivia-question.dto';
import { TicTacToeGame, PlayerSymbol } from 'src/tic-tac-toe/tic-tac-toe.types';
import { MakeMoveDto } from './dto/make-move.dto';
import { AnswerTriviaDto } from './dto/answer-trivia.dto';

@Injectable()
export class TriviaService {
  private games = new Map<string, TicTacToeGame>();

  constructor(private readonly httpService: HttpService) {}

  makeMove(dto: MakeMoveDto): TicTacToeGame {
    const game = this.getGame(dto.gameId);

    if (game.activeTrivia) {
      throw new BadRequestException('Trivia must be answered before moving');
    }

    if (game.board[dto.cellIndex] !== null) {
      throw new BadRequestException('Cell already occupied');
    }

    game.board[dto.cellIndex] = game.currentTurn;
    game.answeredQuestions++;

    const winner = this.checkWinner(game.board);
    game.winner = winner ?? undefined;

    if (!game.winner) {
      game.currentTurn = game.currentTurn === 'X' ? 'O' : 'X';
    }

    return game;
  }

  answerTrivia(dto: AnswerTriviaDto): boolean {
    const game = this.getGame(dto.gameId);
    const trivia = game.activeTrivia;

    if (!trivia) {
      throw new BadRequestException('No active trivia question');
    }

    if (new Date() > trivia.expiresAt) {
      game.activeTrivia = undefined;
      // Change turn if expired
      game.currentTurn = this.nextPlayer(game);
      throw new BadRequestException('Trivia question expired');
    }

    const isCorrect = dto.answer === trivia.correctAnswer;

    game.activeTrivia = undefined; // Clear trivia

    if (!isCorrect) {
      // Change turn on wrong answer
      game.currentTurn = this.nextPlayer(game);
      return false;
    }

    return true;
  }
  private nextPlayer(game: TicTacToeGame): PlayerSymbol {
    // Assuming player1 is always 'X', player2 is always 'O'
    return game.currentTurn === 'X' ? 'O' : 'X';
  }

  async fetchQuestions(
    amount = 10,
    difficulty?: string,
    category?: number,
    type = 'boolean',
  ): Promise<TriviaQuestionDto[]> {
    try {
      let url = `https://opentdb.com/api.php?amount=${amount}&type=${type}`;
      if (difficulty) url += `&difficulty=${difficulty}`;
      if (category) url += `&category=${category}`;

      const response = await firstValueFrom(
        this.httpService.get<{ results: TriviaQuestionDto[] }>(url),
      );

      return response.data.results;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to fetch trivia questions',
      );
    }
  }

  private checkWinner(board: (PlayerSymbol | null)[]): PlayerSymbol | null {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of wins) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  private getGame(gameId: string): TicTacToeGame {
    const game = this.games.get(gameId);
    if (!game) throw new BadRequestException('Game not found');
    return game;
  }

  // Optional helper to register a new game (if needed)
  registerGame(game: TicTacToeGame) {
    this.games.set(game.id, game);
  }
}
