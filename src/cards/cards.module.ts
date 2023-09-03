import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardsRepositories } from './cards.repositories';

@Module({
  controllers: [CardsController],
  providers: [CardsService,CardsRepositories],
})
export class CardsModule {}
