import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { GetPaginatedArgs } from 'src/common/dto/getPaginated.args';
import {
  UnauthorizedException,
  UseGuards,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { CurrentUser, UserData } from 'src/decorators/currentUser';
import { User } from 'src/users/entities/user.entity';
import { Schema } from 'mongoose';
import { ReviewMessage } from './dto/return-message';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  @UseGuards(JwtAuthGuard)
  addReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @CurrentUser() user: User,
  ) {
    createReviewInput.userId = user._id;
    createReviewInput.date = new Date();
    console.log(createReviewInput);

    return this.reviewsService.create(createReviewInput);
  }

  @Query(() => [Review], { name: 'reviews' })
  findGameReviews(
    @Args() { page, limit }: GetPaginatedArgs,
    @Args('gameId') gameId: string,
  ) {
    return this.reviewsService.findAll(page, limit, gameId);
  }

  @Query(() => Review, { name: 'review' })
  reviewDetails(@Args('id', { type: () => String }) id: Schema.Types.ObjectId) {
    return this.reviewsService.findOne(id);
  }

  @Mutation(() => ReviewMessage)
  @UseGuards(JwtAuthGuard)
  async updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
    @CurrentUser() user: UserData,
  ): Promise<ReviewMessage> {
    try {
      const review = await this.reviewsService.findOne(updateReviewInput._id);
      if (!review) {
        throw new NotFoundException('Review not found');
      }
      if (user._id !== review.toObject().userId.toString()) {
        throw new UnauthorizedException(
          'You are not allowed to update this review',
        );
      }
      await this.reviewsService.update(
        updateReviewInput._id,
        updateReviewInput,
      );
      return { message: 'review has been updated' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Mutation(() => ReviewMessage)
  @UseGuards(JwtAuthGuard)
  async removeReview(
    @Args('_id', { type: () => String }) id: Schema.Types.ObjectId,
    @CurrentUser() user: UserData,
  ): Promise<ReviewMessage> {
    try {
      if (user.role !== 'admin') {
        throw new UnauthorizedException('You are not allowed to delete');
      }
      const deleted = await this.reviewsService.remove(id);
      if (deleted.deletedCount === 0) {
        // or condition !deleted.deletedCount
        throw new NotFoundException('Review not found');
      }
      return { message: 'Game has been deleted' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
