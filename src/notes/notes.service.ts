import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesRepositories } from './notes.repositories';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepositories: NotesRepositories){}

  async create(createNoteDto: CreateNoteDto,userId: number) {
    return await this.notesRepositories.create(createNoteDto,userId);
  }

  async findAll(userId: number) {
    return await this.notesRepositories.findAll(userId);
  }

  async findOne(id: number,userId: number) {
    return await this.checkNote(id,userId);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto,userId: number) {
    await this.checkNote(id,userId)
    return await this.notesRepositories.updateOne(id,updateNoteDto);
  }

  async remove(id: number,userId: number) {
    await this.checkNote(id,userId)
    return await this.notesRepositories.delete(id);
  }

  async checkNote(id: number,userId: number){
    const note = await this.notesRepositories.findOne(id)
    if(!note) throw new NotFoundException("note not found") 
    if(note.userId !== userId) throw new ForbiddenException()
    return note
  }
}
