import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RegisterModule } from './register/register.module';
import { CredentialsModule } from './credentials/credentials.module';
import { NotesModule } from './notes/notes.module';
import { CardsModule } from './cards/cards.module';
import { UsersModule } from './users/users.module';
import { WifisModule } from './wifis/wifis.module';
import { LicensesModule } from './licenses/licenses.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    PrismaModule,
    RegisterModule,
    CredentialsModule,
    NotesModule,
    CardsModule,
    UsersModule,
    WifisModule,
    LicensesModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
