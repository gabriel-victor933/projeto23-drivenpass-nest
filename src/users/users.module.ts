import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepositories } from './users.repositories';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepositories],
})
export class UsersModule {}
