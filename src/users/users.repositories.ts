import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  async passwordCount(userId: number) {
    return this.prismaService.user.findFirst({
      where: { id: userId },
      include: {
        _count: {
          select: {
            cards: true,
            credentials: true,
            licenses: true,
            notes: true,
            wifis: true,
          },
        },
      },
    });
  }
}
