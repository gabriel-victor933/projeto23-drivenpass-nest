import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateLicenseDto {
    @IsString()
    @ApiProperty()
    software: string 
    @IsString()
    @ApiProperty()
    version: string
    @IsString()
    @ApiProperty()
    key: string
}
