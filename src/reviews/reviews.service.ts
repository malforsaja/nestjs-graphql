import { Injectable } from '@nestjs/common';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './entities/review.entity';
import { Model, Schema } from 'mongoose';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  create(createReviewInput: CreateReviewInput) {
    return this.reviewModel.create(createReviewInput);
  }

  findAll(page: number, limit: number, gameId: string) {
    return this.reviewModel
      .find({ gameId })
      .skip(page * limit)
      .limit(limit);
  }

  findOne(id: Schema.Types.ObjectId) {
    return this.reviewModel.findById(id);
  }

  update(id: Schema.Types.ObjectId, updateReviewInput: UpdateReviewInput) {
    return this.reviewModel.updateOne({ _id: id }, updateReviewInput);
  }

  remove(id: Schema.Types.ObjectId) {
    return this.reviewModel.deleteOne({ _id: id });
  }
}
