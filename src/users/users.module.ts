import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepositories } from './users.repositories';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.SECRET,
    signOptions: { expiresIn: '1 day' },
  }),],
  controllers: [UsersController],
  providers: [UsersService, UsersRepositories],
  exports: [UsersRepositories]
})
export class UsersModule {}
