import { Module } from '@nestjs/common';
import { TicTacToeService } from './tic-tac-toe.service';
import { TicTacToeController } from './tic-tac-toe.controller';
import { TriviaModule } from '../trivia/trivia.module';

@Module({
  imports: [TriviaModule],
  controllers: [TicTacToeController],
  providers: [TicTacToeService],
  exports: [TicTacToeService],
})
export class TicTacToeModule {}
