import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { User } from 'src/commons/decorators/users.decorator';
import { AuthGuard } from 'src/commons/guards/auth.guard';


@Controller('cards')
@UseGuards(AuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto, @User() userId: number) {
    try {
      await this.cardsService.create(createCardDto,userId);
    } catch(err){
      if(err.code === "P2002") throw new ConflictException();
      throw new InternalServerErrorException()
    }
  }

  @Get()
  findAll(@User() userId: number) {
    return this.cardsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() userId: number) {
    return this.cardsService.findOne(+id,userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto,@User() userId: number) {
    try {
      await this.cardsService.update(+id, updateCardDto,userId);
    } catch(err){
      if(err.code === "P2002") throw new ConflictException();
      throw new InternalServerErrorException()
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string,@User() userId: number) {
     this.cardsService.remove(+id,userId);
  }
}
