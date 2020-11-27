import { InputType, Field } from '@nestjs/graphql';
import { UserUpdateOneRequiredWithoutCommentInput } from '../user/user-update-one-required-without-comment.input';

@InputType()
export class CommentUpdateWithoutArticleInput {
    @Field(() => String, {
        nullable: true,
    })
    id?: string;

    @Field(() => String, {
        nullable: true,
    })
    createdAt?: Date | string;

    @Field(() => String, {
        nullable: true,
    })
    updatedAt?: Date | string;

    @Field(() => String, {
        nullable: true,
    })
    body?: string;

    @Field(() => UserUpdateOneRequiredWithoutCommentInput, {
        nullable: true,
    })
    author?: UserUpdateOneRequiredWithoutCommentInput;
}
