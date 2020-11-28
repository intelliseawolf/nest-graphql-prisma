import { InputType, Field } from '@nestjs/graphql';
import { UserCreateWithoutFavoriteArticlesInput } from './user-create-without-favorite-articles.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserCreateOrConnectWithoutfavoriteArticlesInput } from './user-create-or-connect-withoutfavorite-articles.input';

@InputType()
export class UserCreateManyWithoutFavoriteArticlesInput {
    @Field(() => [UserCreateWithoutFavoriteArticlesInput], {
        nullable: true,
    })
    create?: UserCreateWithoutFavoriteArticlesInput | Array<UserCreateWithoutFavoriteArticlesInput>;

    @Field(() => [UserWhereUniqueInput], {
        nullable: true,
    })
    connect?: UserWhereUniqueInput | Array<UserWhereUniqueInput>;

    @Field(() => [UserCreateOrConnectWithoutfavoriteArticlesInput], {
        nullable: true,
    })
    connectOrCreate?:
        | UserCreateOrConnectWithoutfavoriteArticlesInput
        | Array<UserCreateOrConnectWithoutfavoriteArticlesInput>;
}