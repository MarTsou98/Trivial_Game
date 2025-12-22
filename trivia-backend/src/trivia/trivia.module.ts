import { Module } from '@nestjs/common';
import { TriviaService } from './trivia.service';
import { TriviaController } from './trivia.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TriviaService],
  controllers: [TriviaController],
})
export class TriviaModule {}
