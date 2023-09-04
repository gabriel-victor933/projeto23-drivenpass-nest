import { IsBoolean, IsCreditCard, IsIn, IsNumberString, IsString, Length, Matches } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
export class CreateCardDto {
    @ApiProperty()
    @IsString()
    title: string 
    @ApiProperty()
    @IsCreditCard()
    number: string
    @ApiProperty()
    @IsString()
    name: string
    @ApiProperty()
    @IsNumberString()
    @Length(3)
    cvv:  string
    @ApiProperty()
    @Matches('^[0-9]{2}/[0-9]{2}$')
    expirationDate:  string
    @ApiProperty()
    @IsString()
    password: string
    @ApiProperty()
    @IsBoolean()
    isVirtual:  boolean
    @ApiProperty()
    @IsString()
    @IsIn(["CREDIT","DEBT","BOTH"])
    type: "CREDIT" | "DEBT" | "BOTH" 
}
