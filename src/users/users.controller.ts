import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersServices } from './users.service';
import { EraseDto } from './dto/erase.dto';
import { AuthGuard } from '../commons/guards/auth.guard';
import { User } from '../commons/decorators/users.decorator';

@Controller('erase')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersServices: UsersServices) {}

  @Post()
  deleteAccount(@Body() eraseDto: EraseDto, @User() userId: number) {
    return this.usersServices.deleteAccount(eraseDto.password, userId);
  }
}
