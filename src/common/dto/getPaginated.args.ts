import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class GetPaginatedArgs {
  @Field(() => Int, { defaultValue: 0 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;
}
