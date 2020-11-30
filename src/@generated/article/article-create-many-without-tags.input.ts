import { InputType, Field } from '@nestjs/graphql';
import { ArticleCreateWithoutTagsInput } from './article-create-without-tags.input';
import { ArticleWhereUniqueInput } from './article-where-unique.input';
import { ArticleCreateOrConnectWithouttagsInput } from './article-create-or-connect-withouttags.input';

@InputType()
export class ArticleCreateManyWithoutTagsInput {
    @Field(() => [ArticleCreateWithoutTagsInput], {
        nullable: true,
    })
    create?: ArticleCreateWithoutTagsInput | Array<ArticleCreateWithoutTagsInput>;

    @Field(() => [ArticleWhereUniqueInput], {
        nullable: true,
    })
    connect?: ArticleWhereUniqueInput | Array<ArticleWhereUniqueInput>;

    @Field(() => [ArticleCreateOrConnectWithouttagsInput], {
        nullable: true,
    })
    connectOrCreate?:
        | ArticleCreateOrConnectWithouttagsInput
        | Array<ArticleCreateOrConnectWithouttagsInput>;
}
