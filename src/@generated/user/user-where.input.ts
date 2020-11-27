import { InputType, Field } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { UserListRelationFilter } from './user-list-relation-filter.input';
import { ArticleListRelationFilter } from '../article/article-list-relation-filter.input';
import { CommentListRelationFilter } from '../comment/comment-list-relation-filter.input';

@InputType()
export class UserWhereInput {
    @Field(() => [UserWhereInput], {
        nullable: true,
    })
    AND?: UserWhereInput | Array<UserWhereInput>;

    @Field(() => [UserWhereInput], {
        nullable: true,
    })
    OR?: UserWhereInput | Array<UserWhereInput>;

    @Field(() => [UserWhereInput], {
        nullable: true,
    })
    NOT?: UserWhereInput | Array<UserWhereInput>;

    @Field(() => StringFilter, {
        nullable: true,
    })
    id?: StringFilter | string;

    @Field(() => StringFilter, {
        nullable: true,
    })
    email?: StringFilter | string;

    @Field(() => StringFilter, {
        nullable: true,
    })
    name?: StringFilter | string;

    @Field(() => StringFilter, {
        nullable: true,
    })
    password?: StringFilter | string;

    @Field(() => StringFilter, {
        nullable: true,
    })
    bio?: StringFilter | string | null;

    @Field(() => StringFilter, {
        nullable: true,
    })
    image?: StringFilter | string | null;

    @Field(() => UserListRelationFilter, {
        nullable: true,
    })
    following?: UserListRelationFilter;

    @Field(() => UserListRelationFilter, {
        nullable: true,
    })
    followers?: UserListRelationFilter;

    @Field(() => ArticleListRelationFilter, {
        nullable: true,
    })
    favoriteArticles?: ArticleListRelationFilter;

    @Field(() => ArticleListRelationFilter, {
        nullable: true,
    })
    Article?: ArticleListRelationFilter;

    @Field(() => CommentListRelationFilter, {
        nullable: true,
    })
    Comment?: CommentListRelationFilter;
}
