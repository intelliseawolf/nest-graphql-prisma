import { InputType, Field } from '@nestjs/graphql';
import { UserUpdateWithoutArticleInput } from './user-update-without-article.input';
import { UserCreateWithoutArticleInput } from './user-create-without-article.input';

@InputType()
export class UserUpsertWithoutArticleInput {
    @Field(() => UserUpdateWithoutArticleInput, {
        nullable: true,
    })
    update?: UserUpdateWithoutArticleInput;

    @Field(() => UserCreateWithoutArticleInput, {
        nullable: true,
    })
    create?: UserCreateWithoutArticleInput;
}