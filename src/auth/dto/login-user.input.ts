import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'email of user' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'password of user' })
  @IsNotEmpty()
  password: string;
}
