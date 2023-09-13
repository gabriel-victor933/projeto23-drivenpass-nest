import { Module } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { LicensesController } from './licenses.controller';
import { LicensesRepositories } from './licenses.repositories';

@Module({
  controllers: [LicensesController],
  providers: [LicensesService,LicensesRepositories],
})
export class LicensesModule {}
