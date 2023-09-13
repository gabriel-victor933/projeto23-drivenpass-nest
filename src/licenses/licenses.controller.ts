import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { User } from 'src/commons/decorators/users.decorator';

@Controller('licenses')
@UseGuards(AuthGuard)
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post()
  async create(@Body() createLicenseDto: CreateLicenseDto, @User() userId: number) {
    try {
      await this.licensesService.create(createLicenseDto,userId);
    } catch(err){
      if(err.code == "P2002") throw new ConflictException("License already in use")
      throw new InternalServerErrorException()
    }
  }

  @Get()
  findAll(@User() userId: number) {
    return this.licensesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@User() userId: number) {
    return this.licensesService.findOne(+id,userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenseDto: UpdateLicenseDto,@User() userId: number) {
    return this.licensesService.update(+id, updateLicenseDto,userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string,@User() userId: number) {
    await this.licensesService.remove(+id,userId);
  }
}
