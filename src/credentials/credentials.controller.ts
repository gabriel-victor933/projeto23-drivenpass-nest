import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import {User} from "src/commons/decorators/users.decorator"

@Controller('credentials')
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  async create(@Body() createCredentialDto: CreateCredentialDto, @User() userId: number) {

    try {
      await this.credentialsService.create(createCredentialDto,userId);
    } catch(err){
      if(err.code == "P2002") throw new ConflictException("title already in use")
      throw new InternalServerErrorException()
    }
    
  }

  
  @Get()
  findAll() {
    return "ok";
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.credentialsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCredentialDto: UpdateCredentialDto) {
    return this.credentialsService.update(+id, updateCredentialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.credentialsService.remove(+id);
  }
}
