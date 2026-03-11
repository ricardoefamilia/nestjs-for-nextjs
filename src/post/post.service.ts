import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { createSlugFromText } from 'src/common/utils/create-slug-from-text';
import { Post, User } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByOrFail(postData: Partial<Post>) {
    const post = await this.prisma.post.findFirst({
      where: postData,
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

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    return post;
  }

  async create(dto: CreatePostDto, authorId: User['id']) {
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
  }

  async findPublic(params: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = params;

    const skip = (page - 1) * limit;

    return this.prisma.post.findMany({
      where: {
        published: true,
        ...(search && {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { excerpt: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
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
  }

  async findOnePublic(slug: string) {
    return this.findOneByOrFail({
      slug,
      published: true,
    });
  }

  async findOwned(authorId: string) {
    return this.prisma.post.findMany({
      where: {
        authorId,
      },
      orderBy: {
        createdAt: 'desc',
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
  }

  async findOwnedOneOrFail(id: string, authorId: string) {
    const post = await this.findOneByOrFail({ id });

    if (post.authorId !== authorId) {
      throw new ForbiddenException('Você não pode acessar este post');
    }

    return post;
  }

  async update(id: string, authorId: string, dto: UpdatePostDto) {
    const post = await this.findOwnedOneOrFail(id, authorId);

    return this.prisma.post.update({
      where: { id: post.id },
      data: {
        title: dto.title ?? post.title,
        excerpt: dto.excerpt ?? post.excerpt,
        content: dto.content ?? post.content,
        coverImageUrl: dto.coverImageUrl ?? post.coverImageUrl,
        published: dto.published ?? post.published,
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
  }

  async remove(id: string, authorId: string) {
    const post = await this.findOwnedOneOrFail(id, authorId);

    await this.prisma.post.delete({
      where: { id },
    });

    return post;
  }
}
