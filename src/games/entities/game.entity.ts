import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Game {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String, { nullable: true })
  @Prop()
  cover: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => String, { nullable: true })
  @Prop()
  image: string;

  @Field(() => String, { nullable: true })
  @Prop()
  price: string;

  @Field(() => [String], { nullable: true })
  @Prop()
  category: string[];

  @Field(() => Date)
  @Prop()
  releaseDate: Date;

  @Field(() => String, { nullable: true })
  @Prop()
  publisher: string;

  @Field(() => Int)
  @Prop()
  rating: number;

  @Field(() => String, { nullable: true })
  @Prop()
  other: string;

  @Field(() => String)
  @Prop()
  userId: MongooSchema.Types.ObjectId;
}

export type GameDocument = Game & Document;
export const GameSchema = SchemaFactory.createForClass(Game);
