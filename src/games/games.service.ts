import { Injectable } from '@nestjs/common';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Game, GameDocument } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async addGame(createGameInput: CreateGameInput) {
    const createdGame = await this.gameModel.create(createGameInput);
    return createdGame;
  }

  findAll() {
    return this.gameModel.find().skip(0).limit(10);
  }

  findOne(id: Schema.Types.ObjectId) {
    return this.gameModel.findById(id);
  }

  update(id: Schema.Types.ObjectId, updateGameInput: UpdateGameInput) {
    return this.gameModel.updateOne({ _id: id }, updateGameInput);
  }

  remove(id: Schema.Types.ObjectId) {
    return this.gameModel.deleteOne({ _id: id });
  }
}
