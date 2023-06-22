import { Schema } from 'mongoose';
import { CreateGameInput } from './create-game.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGameInput extends PartialType(CreateGameInput) {
  @Field(() => String)
  _id: Schema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  description: string;
}
