import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'name of user' })
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'email of user' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'password of user' })
  @IsNotEmpty()
  password: string;

  @Field(() => String, { description: 'role of user', nullable: true })
  role?: string;
}
