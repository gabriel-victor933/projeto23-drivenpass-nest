import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UsersRepositories } from './users.repositories';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  ROUND: number = 10

  constructor(
    private readonly usersRepositories: UsersRepositories,
    private readonly jwt: JwtService){}

  async create(body: CreateUserDto) {
    const hashPassword = await bcrypt.hash(body.password,this.ROUND)
    await this.usersRepositories.create(body.email,hashPassword)
  }

  async loginUser(body: CreateUserDto){
    const user = await this.usersRepositories.findByEmail(body.email)
    if(!user) throw new NotFoundException()
    const isValid = await bcrypt.compare(body.password,user.password)
    if(!isValid) throw new UnauthorizedException("invalid informations")
    return {token: await this.jwt.sign({userId: user.id,email: user.email})}

  }

}
