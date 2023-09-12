import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateWifiDto {
    @IsString()
    @ApiProperty()     
    title: string
    @IsString()
    @ApiProperty()
    network: string
    @IsString()
    @ApiProperty()
    password: string
}
