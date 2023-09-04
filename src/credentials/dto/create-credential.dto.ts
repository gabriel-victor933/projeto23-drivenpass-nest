import { IsString, IsUrl } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateCredentialDto {
    @ApiProperty()
    @IsString()
    title: string
    @ApiProperty()
    @IsString()
    username: string
    @ApiProperty()
    @IsString()
    password: string
    @ApiProperty()
    @IsUrl()
    url: string
}
