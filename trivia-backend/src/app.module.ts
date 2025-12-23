import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TriviaModule } from './trivia/trivia.module';
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';

@Module({
  imports: [TriviaModule, TicTacToeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
