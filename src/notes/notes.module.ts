import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesRepositories } from './notes.repositories';

@Module({
  controllers: [NotesController],
  providers: [NotesService,NotesRepositories],
})
export class NotesModule {}
