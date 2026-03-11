import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { createSlugFromText } from 'src/common/utils/create-slug-from-text';
import { User } from '@prisma/client';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePostDto, authorId: User['id']) {
    try {
      const created = await this.prisma.post.create({
        data: {
          slug: createSlugFromText(dto.title),
          title: dto.title,
          content: dto.content,
          excerpt: dto.excerpt,
          coverImageUrl: dto.coverImageUrl ?? null,
          published: false,

          author: {
            connect: {
              id: authorId,
            },
          },
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return created;
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error('Erro ao criar post', err.stack);
      }

      throw new BadRequestException('Erro ao criar o post');
    }
  }
}
