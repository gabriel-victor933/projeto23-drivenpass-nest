import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';
import { CardsModule } from './cards/cards.module';
import { EraseModule } from './erase/erase.module';
import { WifisModule } from './wifis/wifis.module';
import { LicensesModule } from './licenses/licenses.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [PrismaModule, UsersModule, CredentialsModule, NotesModule, CardsModule, EraseModule, WifisModule, LicensesModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
