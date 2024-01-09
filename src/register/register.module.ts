import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { RegisterRepositories } from './register.repositories';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1 day' },
    }),
  ],
  controllers: [RegisterController],
  providers: [RegisterService, RegisterRepositories],
  exports: [RegisterRepositories],
})
export class RegisterModule {}
