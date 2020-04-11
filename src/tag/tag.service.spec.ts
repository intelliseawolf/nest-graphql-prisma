import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../prisma/prisma.service';
import { TagService } from './tag.service';

jest.mock('../prisma/prisma.service');

describe('TagService', () => {
    let service: TagService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TagService, PrismaService],
        }).compile();

        service = module.get<TagService>(TagService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
