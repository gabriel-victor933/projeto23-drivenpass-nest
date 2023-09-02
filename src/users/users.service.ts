import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersRepositories } from './users.repositories';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {

  ROUND: number = 10

  constructor(private readonly usersRepositories: UsersRepositories){}

  async create(body: CreateUserDto) {
    const hashPassword = await bcrypt.hash(body.password,10)
    await this.usersRepositories.create(body.email,hashPassword)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
