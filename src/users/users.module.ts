import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepositories } from './users.repositories';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: "top_secret",
    signOptions: { expiresIn: '1 day' },
  }),],
  controllers: [UsersController],
  providers: [UsersService, UsersRepositories],
})
export class UsersModule {}
