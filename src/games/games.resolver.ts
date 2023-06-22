import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { Schema } from 'mongoose';
import { CurrentUser, UserData } from 'src/decorators/currentUser';
import { GameMessage } from './dto/return-message';
import { User } from 'src/users/entities/user.entity';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GqlThrottlerGuard } from 'src/guards/gql-throttler.guard';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation(() => Game)
  @UseGuards(JwtAuthGuard)
  createGame(
    @CurrentUser() user: User,
    @Args('createGameInput') createGameInput: CreateGameInput,
  ) {
    createGameInput.userId = user._id;
    return this.gamesService.addGame(createGameInput);
  }

  @Query(() => [Game], { name: 'games' })
  retriveGames() {
    return this.gamesService.findAll();
  }

  @Query(() => Game, { name: 'game' })
  // @UseGuards(ThrottlerGuard, GqlThrottlerGuard)
  // Rate limiting doesn't work with graphql, maybe some extra configuration is needed
  // DOCS: https://docs.nestjs.com/security/rate-limiting#graphql
  // ERROR: { "message": "Cannot read properties of undefined (reading 'ip')"}
  gameDetails(@Args('id', { type: () => String }) id: Schema.Types.ObjectId) {
    return this.gamesService.findOne(id);
  }

  @Mutation(() => GameMessage)
  @UseGuards(JwtAuthGuard)
  async updateGame(
    @Args('updateGameInput') updateGameInput: UpdateGameInput,
    @CurrentUser() user: UserData,
  ): Promise<GameMessage> {
    try {
      const game = await this.gamesService.findOne(updateGameInput._id);
      if (!game) {
        throw new NotFoundException('Review not found');
      }
      if (user._id !== game.toObject().userId.toString()) {
        throw new UnauthorizedException(
          'You are not allowed to update this review',
        );
      }
      await this.gamesService.update(updateGameInput._id, updateGameInput);
      return { message: 'Game has been updated' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Mutation(() => GameMessage)
  @UseGuards(JwtAuthGuard)
  async removeGame(
    @Args('id', { type: () => String }) id: Schema.Types.ObjectId,
    @CurrentUser() user: UserData,
  ): Promise<GameMessage> {
    try {
      if (user.role !== 'admin') {
        throw new UnauthorizedException('You are not allowed to delete');
      }
      const deleted = await this.gamesService.remove(id);
      if (deleted.deletedCount === 0) {
        // or condition !deleted.deletedCount
        throw new NotFoundException('Game not found');
      }
      return { message: 'Game has been deleted' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
