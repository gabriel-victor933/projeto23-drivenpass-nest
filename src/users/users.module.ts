import { Module } from '@nestjs/common';
import { UsersServices } from './users.service';
import { UsersController } from './users.controller';
import { RegisterModule } from '../register/register.module';
import { UsersRepositories } from './users.repositories';

@Module({
  imports: [RegisterModule],
  providers: [UsersServices, UsersRepositories],
  controllers: [UsersController],
})
export class UsersModule {}
