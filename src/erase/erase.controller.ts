import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { EraseDto } from './dto/erase.dto';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { User } from 'src/commons/decorators/users.decorator';

@Controller('erase')
@UseGuards(AuthGuard)
export class EraseController {
    constructor(private readonly eraseService: EraseService){}

    @Post()
    deleteAccount(@Body() eraseDto: EraseDto, @User() userId: number){
        return this.eraseService.deleteAccount(eraseDto.password,userId)
    }
}
