import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("sign-up")
  async createUser(@Body() body: CreateUserDto){
    try {
        return await this.usersService.create(body)
    } catch(err){
      if(err.code === "P2002") throw new ConflictException("Email already in use!")
      throw new InternalServerErrorException()
    }
    
  }

  @Post("sign-in")
  async loginUser(@Body() body: CreateUserDto){
    return this.usersService.loginUser(body)
  }
}
