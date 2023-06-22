import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Review {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  title: string;

  @Field(() => String, { nullable: true })
  @Prop()
  email: string;

  @Field(() => String)
  @Prop()
  comment: string;

  @Field(() => String)
  @Prop()
  rating: number;

  @Field(() => String)
  @Prop()
  date: string;

  @Field(() => String)
  @Prop()
  gameId: MongooSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @Prop()
  userId: MongooSchema.Types.ObjectId;
}

export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
