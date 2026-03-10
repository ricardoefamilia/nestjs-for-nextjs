import { Prisma } from '@prisma/client';

type UserPublic = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    createdAt: true;
    updatedAt: true;
  };
}>;

export class UserResponseDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(user: UserPublic) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
