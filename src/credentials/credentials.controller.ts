import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { AuthGuard } from '../commons/guards/auth.guard';
import { User } from '../commons/decorators/users.decorator';

@Controller('credentials')
@UseGuards(AuthGuard)
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  async create(
    @Body() createCredentialDto: CreateCredentialDto,
    @User() userId: number,
  ) {
    try {
      await this.credentialsService.create(createCredentialDto, userId);
    } catch (err) {
      if (err.code == 'P2002')
        throw new ConflictException('title already in use');
      throw new InternalServerErrorException();
    }
  }

  @Get()
  async findAll(@User() userId: number) {
    return this.credentialsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() userId: number) {
    return this.credentialsService.findOne(+id, userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCredentialDto: UpdateCredentialDto,
    @User() userId: number,
  ) {
    try {
      await this.credentialsService.update(+id, updateCredentialDto, userId);
    } catch (err) {
      if (err.code == 'P2002')
        throw new ConflictException('title already in use');
      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() userId: number) {
    this.credentialsService.remove(+id, userId);
  }
}
