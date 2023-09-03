import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from 'src/commons/decorators/users.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @User() userId: number) {
    try {
      await this.notesService.create(createNoteDto,userId);
    } catch(err){
      if("P2002" == err.code ) throw new ConflictException("title already in use")
      throw new InternalServerErrorException()
    }
    
  }

  @Get()
  findAll(@User() userId: number) {
    return this.notesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@User() userId: number) {
    return this.notesService.findOne(+id,userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto,@User() userId: number) {
    
    try {
      await this.notesService.update(+id, updateNoteDto,userId);;
    } catch(err){
      if("P2002" == err.code ) throw new ConflictException("title already in use")
      throw new InternalServerErrorException()
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string,@User() userId: number) {
    this.notesService.remove(+id,userId);
  }
}
