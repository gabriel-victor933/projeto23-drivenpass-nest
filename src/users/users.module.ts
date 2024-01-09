import { Module } from '@nestjs/common';
import { UsersServices } from './users.service';
import { UsersController } from './users.controller';
import { RegisterModule } from '../register/register.module';

@Module({
  imports: [RegisterModule],
  providers: [UsersServices],
  controllers: [UsersController],
})
export class UsersModule {}
