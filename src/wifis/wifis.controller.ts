import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WifisService } from './wifis.service';
import { CreateWifiDto } from './dto/create-wifi.dto';
import { UpdateWifiDto } from './dto/update-wifi.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { User } from 'src/commons/decorators/users.decorator';

@Controller('wifis')
@UseGuards(AuthGuard)
export class WifisController {
  constructor(private readonly wifisService: WifisService) {}

  @Post()
  create(@Body() createWifiDto: CreateWifiDto, @User() userId: number ) {
    this.wifisService.create(createWifiDto,userId);
  }

  @Get()
  async findAll(@User() userId: number ) {
    return await this.wifisService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@User() userId: number ) {
    return await this.wifisService.findOne(+id,userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWifiDto: UpdateWifiDto,@User() userId: number ) {
    await this.wifisService.update(+id, updateWifiDto,userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@User() userId: number) {
    await this.wifisService.remove(+id, userId);
  }
}
