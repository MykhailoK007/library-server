import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getUsers() {
    return await this.prisma.user.findMany();
  }
  async deleteUser(id: string) {
    try {
      const user = await this.prisma.user.delete({ where: { id } });

      return { message: 'User deleted', userId: user.id };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new NotFoundException(`User with Id: ${id} not found`);
      }
    }
  }
  async getUserById(id: string) {
    try {
      return await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new NotFoundException(`User with Id: ${id} not found`);
      }
    }
  }
}
