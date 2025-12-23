// src/tic-tac-toe/tic-tac-toe.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { TicTacToeService } from './tic-tac-toe.service';
import { CreateGameDto } from '../trivia/dto/create-game.dto';
import { MakeMoveDto } from '../trivia/dto/make-move.dto';
import { RequestTriviaDto } from '../trivia/dto/request-trivia.dto';
import { AnswerTriviaDto } from '../trivia/dto/answer-trivia.dto';
import { TriviaService } from '../trivia/trivia.service';

@Controller('tic-tac-toe')
export class TicTacToeController {
  constructor(
    private readonly ticTacToeService: TicTacToeService,
    private readonly triviaService: TriviaService,
  ) {}

  @Post('create')
  createGame(@Body() dto: CreateGameDto) {
    return this.ticTacToeService.createGame(dto);
  }

  @Post('move')
  makeMove(@Body() dto: MakeMoveDto) {
    return this.ticTacToeService.makeMove(dto); // pass dto instead of three separate arguments
  }

  @Post('trivia')
  requestTrivia(@Body() dto: RequestTriviaDto) {
    return this.ticTacToeService.requestTrivia(dto.gameId);
  }

  @Post('trivia/answer')
  answerTrivia(@Body() dto: AnswerTriviaDto) {
    return this.triviaService.answerTrivia(dto);
  }
  @Post('join')
  joinGame(@Body() body: { gameId: string; playerId: string }) {
    return this.ticTacToeService.joinGame(body.gameId, body.playerId);
  }
}
