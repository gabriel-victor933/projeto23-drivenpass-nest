import { IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
    @ApiProperty()
    @IsString()
    title: string
    @ApiProperty()
    @IsString()
    text: string
}
