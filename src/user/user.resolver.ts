import { UserWhereUniqueInput } from '@generated/user/user-where-unique.input';
import {
    Logger,
    NotFoundException,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import {
    Args,
    Context,
    Info,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { Prisma } from '@prisma/client';
import { CurrentUser } from 'app_modules/current-user-decorator';
import {
    GraphqlAuthGuard,
    OptionalGraphqlAuthGuard,
} from 'app_modules/nestjs-passport-graphql-auth-guard';
import assert from 'assert';
import { GraphQLResolveInfo } from 'graphql';

import { PassportUserFields } from '../auth';
import { AuthService } from '../auth/auth.service';
import { GraphQLContext } from '../types';
import { User } from './models/user.model';
import { UserCreateInput } from './models/user-create-input';
import { UserLoginInput } from './models/user-login-input';
import { UserUpdateInput } from './models/user-update-input';
import { UserService } from './user.service';

/**
 * Resolves user object type.
 */
@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly logger: Logger,
    ) {}

    /**
     * Query for self profile.
     */
    @Query(() => User)
    @UseGuards(GraphqlAuthGuard)
    async me(@CurrentUser() user: PassportUserFields) {
        return this.userService.findOne({ userId: user.id });
    }

    /**
     * Query for single user.
     */
    @Query(() => User)
    @UseGuards(OptionalGraphqlAuthGuard)
    async user(
        @Args('where') where: UserWhereUniqueInput,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info).value;
        const user = await this.userService.findUnique({
            ...select,
            where,
        });
        if (!user) {
            throw new NotFoundException(
                `User with ${JSON.stringify(where)} do not exists.`,
            );
        }
        return user;
    }

    @Mutation(() => User)
    async createUser(
        @Args('data') data: UserCreateInput,
        @Context() context: GraphQLContext,
    ) {
        const user = await this.userService.create(data);
        ({ accessToken: context.token } = await this.authService.session(user));
        return user;
    }

    @Mutation(() => User)
    @UseGuards(GraphqlAuthGuard)
    async updateUser(
        @Args('data') data: UserUpdateInput,
        @CurrentUser() user: PassportUserFields,
    ) {
        return this.userService.update(
            { userId: user.id },
            data as Prisma.UserUpdateInput,
        );
    }

    @Mutation(() => User)
    async loginUser(
        @Args('data') data: UserLoginInput,
        @Context() context: GraphQLContext,
    ) {
        const user = await this.userService.findByCredentials(data);
        if (!user) {
            throw new UnauthorizedException();
        }
        ({ accessToken: context.token } = await this.authService.session(user));
        return user;
    }

    @Mutation(() => User)
    @UseGuards(GraphqlAuthGuard)
    async follow(
        @CurrentUser() currentUser: PassportUserFields,
        @Args('where') where: UserWhereUniqueInput,
        @Args('value') value: boolean,
    ) {
        const user = await this.userService.findOne(where);
        if (!user) {
            throw new NotFoundException(
                `User ${JSON.stringify(where)} do not exists`,
            );
        }
        const follower = { userId: currentUser.id };
        return this.userService.follow(where, follower, value);
    }

    // @ResolveField(() => String, { nullable: true })
    // password(@Parent() user: User) {
    //     return;
    // }

    @ResolveField(() => String, { nullable: true })
    async token(@Parent() user: User, @Context() context: GraphQLContext) {
        return context.token;
    }

    /**
     * Check if current user is follow some user.
     */
    @ResolveField(() => Boolean)
    async isFollowing(
        @Parent() user: User,
        @CurrentUser() currentUser?: PassportUserFields,
    ): Promise<boolean> {
        if (!currentUser) {
            return false;
        }
        // todo: Another problem if client request all followers
        // But we constrained to one current to src/article/article.resolver.ts@article
        if (!Array.isArray(user.followers)) {
            this.logger.warn(
                'Followers is not selected',
                'Performance Warning',
            );
        }
        assert(user.userId);
        return (
            user.followers?.some(
                (follower) => follower.userId === currentUser.id,
            ) ?? this.userService.isFollowing(user.userId, currentUser.id)
        );
    }
}
