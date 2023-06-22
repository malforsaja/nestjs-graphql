import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { GameSchema } from './entities/game.entity';

@Module({
  providers: [GamesResolver, GamesService],
  imports: [MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }])],
  exports: [GamesService],
})
export class GamesModule {}
