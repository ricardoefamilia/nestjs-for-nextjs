import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponseDto } from './dto/post-response.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Criar post
  @UseGuards(JwtAuthGuard)
  @Post('me')
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreatePostDto) {
    const post = await this.postService.create(dto, req.user.id);
    return new PostResponseDto(post);
  }

  // Listar posts públicos com paginação e ordenação
  @Get()
  async findPublic(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search?: string,
  ) {
    const posts = await this.postService.findPublic({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    return posts.map(post => new PostResponseDto(post));
  }

  // Buscar post público por slug
  @Get(':slug')
  async findOnePublic(@Param('slug') slug: string) {
    const post = await this.postService.findOnePublic(slug);
    return new PostResponseDto(post);
  }

  // Listar posts do usuário logado
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findOwned(@Req() req: AuthenticatedRequest) {
    const posts = await this.postService.findOwned(req.user.id);
    return posts.map(post => new PostResponseDto(post));
  }

  // Buscar post específico do usuário
  @UseGuards(JwtAuthGuard)
  @Get('me/:id')
  async findOwnedOne(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    const post = await this.postService.findOwnedOneOrFail(id, req.user.id);

    return new PostResponseDto(post);
  }

  // Atualizar post
  @UseGuards(JwtAuthGuard)
  @Patch('me/:id')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ) {
    const post = await this.postService.update(id, req.user.id, dto);

    return new PostResponseDto(post);
  }

  // Remover post
  @UseGuards(JwtAuthGuard)
  @Delete('me/:id')
  async remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const post = await this.postService.remove(id, req.user.id);
    return new PostResponseDto(post);
  }
}
