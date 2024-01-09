import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('sign-up')
  async createUser(@Body() body: CreateUserDto) {
    try {
      return await this.registerService.create(body);
    } catch (err) {
      if (err.code === 'P2002')
        throw new ConflictException('Email already in use!');
      throw new InternalServerErrorException();
    }
  }

  @Post('sign-in')
  async loginUser(@Body() body: CreateUserDto) {
    return this.registerService.loginUser(body);
  }
}
