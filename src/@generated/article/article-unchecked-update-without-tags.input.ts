import { Field, InputType, Int } from '@nestjs/graphql';

import { CommentUncheckedUpdateManyWithoutArticleInput } from '../comment/comment-unchecked-update-many-without-article.input';
import { UserUncheckedUpdateManyWithoutFavoriteArticlesInput } from '../user/user-unchecked-update-many-without-favorite-articles.input';

@InputType()
export class ArticleUncheckedUpdateWithoutTagsInput {
    @Field(() => String, { nullable: true })
    articleId?: string;

    @Field(() => String, { nullable: true })
    slug?: string;

    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => String, { nullable: true })
    body?: string;

    @Field(() => Date, { nullable: true })
    createdAt?: Date | string;

    @Field(() => Date, { nullable: true })
    updatedAt?: Date | string;

    @Field(() => Int, { nullable: true })
    favoritesCount?: number;

    @Field(() => String, { nullable: true })
    authorId?: string;

    @Field(() => UserUncheckedUpdateManyWithoutFavoriteArticlesInput, {
        nullable: true,
    })
    favoritedBy?: UserUncheckedUpdateManyWithoutFavoriteArticlesInput;

    @Field(() => CommentUncheckedUpdateManyWithoutArticleInput, { nullable: true })
    comments?: CommentUncheckedUpdateManyWithoutArticleInput;
}
