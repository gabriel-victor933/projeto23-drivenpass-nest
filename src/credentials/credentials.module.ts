import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepositories } from './credential.repositories';

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService,CredentialsRepositories],
})
export class CredentialsModule {}
