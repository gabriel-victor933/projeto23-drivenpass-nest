import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { UsersServices } from './users.service';
import { EraseDto } from './dto/erase.dto';
import { AuthGuard } from '../commons/guards/auth.guard';
import { User } from '../commons/decorators/users.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersServices: UsersServices) {}

  @Post('delete')
  deleteAccount(@Body() eraseDto: EraseDto, @User() userId: number) {
    return this.usersServices.deleteAccount(eraseDto.password, userId);
  }

  @Get('passwords')
  getPasswordsCount(@User() userId: number) {
    return this.usersServices.passwordCount(userId);
  }
}
