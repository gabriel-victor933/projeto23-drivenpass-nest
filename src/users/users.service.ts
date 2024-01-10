import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterRepositories } from '../register/register.repositories';
import * as bcrypt from 'bcrypt';
import { UsersRepositories } from './users.repositories';

@Injectable()
export class UsersServices {
  constructor(
    private readonly registerRepositories: RegisterRepositories,
    private readonly usersRepositories: UsersRepositories,
  ) {}

  async deleteAccount(password: string, userId: number) {
    const user = await this.registerRepositories.findById(userId);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('invalid password');
    await this.registerRepositories.deleteAll(userId);
  }

  async passwordCount(userId: number) {
    const response = await this.usersRepositories.passwordCount(userId);
    return response._count;
  }
}
