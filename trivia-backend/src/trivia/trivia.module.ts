import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TriviaService } from './trivia.service';
import { TriviaController } from './trivia.controller';
import { TicTacToeService } from 'src/tic-tac-toe/tic-tac-toe.service';

@Module({
  imports: [HttpModule],
  providers: [TriviaService],
  controllers: [TriviaController],
  exports: [TriviaService],
})
export class TriviaModule {}

