import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentUncheckedUpdateInput {
    @Field(() => String, {
        nullable: true,
    })
    commentId?: string;

    @Field(() => Date, {
        nullable: true,
    })
    createdAt?: Date | string;

    @Field(() => Date, {
        nullable: true,
    })
    updatedAt?: Date | string;

    @Field(() => String, {
        nullable: true,
    })
    body?: string;

    @Field(() => String, {
        nullable: true,
    })
    authorId?: string;

    @Field(() => String, {
        nullable: true,
    })
    articleId?: string;
}
