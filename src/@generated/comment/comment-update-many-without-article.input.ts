import { Field, InputType } from '@nestjs/graphql';

import { CommentCreateOrConnectWithoutArticleInput } from './comment-create-or-connect-without-article.input';
import { CommentCreateWithoutArticleInput } from './comment-create-without-article.input';
import { CommentScalarWhereInput } from './comment-scalar-where.input';
import { CommentUpdateManyWithWhereWithoutArticleInput } from './comment-update-many-with-where-without-article.input';
import { CommentUpdateWithWhereUniqueWithoutArticleInput } from './comment-update-with-where-unique-without-article.input';
import { CommentUpsertWithWhereUniqueWithoutArticleInput } from './comment-upsert-with-where-unique-without-article.input';
import { CommentWhereUniqueInput } from './comment-where-unique.input';

@InputType()
export class CommentUpdateManyWithoutArticleInput {
    @Field(() => [CommentCreateWithoutArticleInput], { nullable: true })
    create?: Array<CommentCreateWithoutArticleInput>;

    @Field(() => [CommentCreateOrConnectWithoutArticleInput], { nullable: true })
    connectOrCreate?: Array<CommentCreateOrConnectWithoutArticleInput>;

    @Field(() => [CommentUpsertWithWhereUniqueWithoutArticleInput], { nullable: true })
    upsert?: Array<CommentUpsertWithWhereUniqueWithoutArticleInput>;

    @Field(() => [CommentWhereUniqueInput], { nullable: true })
    set?: Array<CommentWhereUniqueInput>;

    @Field(() => [CommentWhereUniqueInput], { nullable: true })
    disconnect?: Array<CommentWhereUniqueInput>;

    @Field(() => [CommentWhereUniqueInput], { nullable: true })
    delete?: Array<CommentWhereUniqueInput>;

    @Field(() => [CommentWhereUniqueInput], { nullable: true })
    connect?: Array<CommentWhereUniqueInput>;

    @Field(() => [CommentUpdateWithWhereUniqueWithoutArticleInput], { nullable: true })
    update?: Array<CommentUpdateWithWhereUniqueWithoutArticleInput>;

    @Field(() => [CommentUpdateManyWithWhereWithoutArticleInput], { nullable: true })
    updateMany?: Array<CommentUpdateManyWithWhereWithoutArticleInput>;

    @Field(() => [CommentScalarWhereInput], { nullable: true })
    deleteMany?: Array<CommentScalarWhereInput>;
}
