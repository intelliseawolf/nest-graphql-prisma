import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { createSpyObj } from 'jest-createspyobj';

import { PrismaRepository } from '../prisma/prisma.repository';
import { PrismaService } from '../prisma/prisma.service';
import { createUser } from '../user/testing';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { Article } from './models/article';
import { createArticle } from './testing';

describe('ArticleResolver', () => {
    let resolver: ArticleResolver;
    let service: jest.Mocked<ArticleService>;

    beforeEach(async () => {
        service = createSpyObj(ArticleService);
        service.findOne = jest.fn();
        service.favorite = jest.fn();
        service.isFavorited = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticleResolver,
                {
                    provide: ArticleService,
                    useValue: service,
                },
            ],
        }).compile();

        resolver = module.get(ArticleResolver);
        service = module.get(ArticleService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('favorite article second time should fail', async () => {
        service.findOne.mockResolvedValue(
            createArticle({
                favoritedBy: [createUser({ id: '2' })],
            }),
        );
        service.favorite.mockResolvedValue(
            createArticle({
                favoritesCount: 1,
                favoritedBy: [createUser({ id: '2' })],
            }),
        );

        await expect(async () => {
            await resolver.favoriteArticle({ id: '1' }, true, {}, { id: '2' });
        }).rejects.toThrow(ConflictException);

        const result = await resolver.favoriteArticle({ id: '1' }, false, {}, { id: '2' });
        expect(result).toEqual(expect.objectContaining({ favoritesCount: 1 }));
    });

    it('favorited resolve property should return true for favoritedBy property', async () => {
        const article = createArticle({ favoritedBy: [createUser({ id: 'user1' })] });
        expect(await resolver.favorited(article as Article, { id: 'user1' })).toBe(true);
    });

    it('favorited resolve property should return false', async () => {
        let article = createArticle({ favoritedBy: [createUser({ id: 'foo1' })] });
        expect(await resolver.favorited(article as Article, { id: 'user1' })).toBe(false);

        article = createArticle({ favoritedBy: [] });
        expect(await resolver.favorited(article as Article, { id: 'user1' })).toBe(false);
        expect(await resolver.favorited(article as Article, { id: 'user2' })).toBe(false);
    });
});
