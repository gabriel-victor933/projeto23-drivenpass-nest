import { Module } from '@nestjs/common';
import { WifisService } from './wifis.service';
import { WifisController } from './wifis.controller';
import { WifisRepositories } from './wifis.repositories';

@Module({
  controllers: [WifisController],
  providers: [WifisService, WifisRepositories],
})
export class WifisModule {}
