import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { HashingService } from 'src/common/hashing/hashing.service';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async failIfEmailExists(email: string) {
    const exists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      throw new ConflictException('E-mail já existe');
    }
  }

  async findOneByOrFail(userData: Partial<User>) {
    const user = await this.prisma.user.findFirst({
      where: userData,
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async create(dto: CreateUserDto) {
    await this.failIfEmailExists(dto.email);

    const hashedPassword = await this.hashingService.hash(dto.password);
    const created = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });

    return created;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    if (!dto.name && !dto.email) {
      throw new BadRequestException('Dados não enviados');
    }

    const user = await this.findOneByOrFail({ id });

    user.name = dto.name ?? user.name;

    if (dto.email && dto.email !== user.email) {
      await this.failIfEmailExists(dto.email);
      user.email = dto.email;
      user.forceLogout = true;
    }

    return this.save(user);
  }

  save(user: User) {
    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        forceLogout: user.forceLogout,
      },
    });
  }
}
