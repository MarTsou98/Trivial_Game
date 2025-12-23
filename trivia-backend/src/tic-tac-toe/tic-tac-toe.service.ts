// src/tic-tac-toe/tic-tac-toe.service.ts
import { Injectable } from '@nestjs/common';
import { TicTacToeGame, PlayerSymbol } from './tic-tac-toe.types';
import { randomUUID } from 'crypto';
import { TriviaService } from 'src/trivia/trivia.service';
import { CreateGameDto } from '../trivia/dto/create-game.dto';
import { BadRequestException } from '@nestjs/common';
import { MakeMoveDto } from '../trivia/dto/make-move.dto';

@Injectable()
export class TicTacToeService {
  private games = new Map<string, TicTacToeGame>();

  constructor(private readonly triviaService: TriviaService) {}

  /**
   * Creates a new TicTacToe game.
   */
  createGame(dto: CreateGameDto): TicTacToeGame {
    const game: TicTacToeGame = {
      id: randomUUID(),
      board: Array(9).fill(null),
      players: [{ id: dto.playerId, symbol: 'X' }],
      winner: undefined,
      currentTurn: 'X',
      status: 'waiting',
      answeredQuestions: 0,
      activeTrivia: undefined,
      createdAt: new Date(), // fix TS2741
    };

    this.games.set(game.id, game);
    // Add this line
    this.triviaService.registerGame(game);
    return game;
  }

  /**
   * Allows a second player to join an existing game.
   */
  joinGame(gameId: string, playerId: string): TicTacToeGame {
    const game = this.getGame(gameId);

    if (game.players.length >= 2) {
      throw new Error('Game already full');
    }

    game.players.push({ id: playerId, symbol: 'O' });
    game.status = 'in_progress';
    return game;
  }

  /**
   * Makes a move for a player at the specified cell index.
   */
  makeMove(dto: MakeMoveDto): TicTacToeGame {
    const game = this.getGame(dto.gameId);

    // Find the player making the move
    const player = game.players.find((p) => p.id === dto.playerId);
    if (!player) {
      throw new BadRequestException('Player not part of this game');
    }

    // Ensure it's the player's turn
    if (player.symbol !== game.currentTurn) {
      throw new BadRequestException("It's not your turn");
    }

    if (game.board[dto.cellIndex] !== null) {
      throw new BadRequestException('Cell already occupied');
    }

    // Place the move
    game.board[dto.cellIndex] = player.symbol;
    game.answeredQuestions++;

    // Check winner
    const winner = this.checkWinner(game.board);
    game.winner = winner ?? undefined;

    // Switch turn only if game not finished
    if (!winner) {
      // Switch to the other player based on players array
      game.currentTurn = game.players.find(
        (p) => p.symbol !== player.symbol,
      )!.symbol;
    }

    return game;
  }

  /**
   * Requests trivia questions for the current game.
   */
  async requestTrivia(gameId: string) {
    const game = this.getGame(gameId);
    const questions = await this.triviaService.fetchQuestions(1);

    // Set the first question as activeTrivia in the game
    game.activeTrivia = {
      questionId: questions[0].question, // or some unique ID
      correctAnswer: questions[0].correct_answer,
      expiresAt: new Date(Date.now() + 60_000), // e.g., 60 seconds to answer
    };

    return questions;
  }

  /**
   * Helper: fetch a game from the Map
   */
  private getGame(gameId: string): TicTacToeGame {
    const game = this.games.get(gameId);
    if (!game) {
      throw new Error(`Game with ID ${gameId} not found`);
    }
    return game;
  }

  /**
   * Helper: check if a player has won
   */
  private checkWinner(board: (PlayerSymbol | null)[]): PlayerSymbol | null {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombos) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }
}
