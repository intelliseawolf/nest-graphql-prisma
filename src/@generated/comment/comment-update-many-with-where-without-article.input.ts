import { InputType, Field } from '@nestjs/graphql';
import { CommentScalarWhereInput } from './comment-scalar-where.input';
import { CommentUpdateManyMutationInput } from './comment-update-many-mutation.input';

@InputType()
export class CommentUpdateManyWithWhereWithoutArticleInput {
    @Field(() => CommentScalarWhereInput, {
        nullable: true,
        description: undefined,
    })
    where?: CommentScalarWhereInput;

    @Field(() => CommentUpdateManyMutationInput, {
        nullable: true,
        description: undefined,
    })
    data?: CommentUpdateManyMutationInput;
}
