import { IsBoolean, IsCreditCard, IsIn, IsNumberString, IsString, Length, Matches } from "class-validator"

export class CreateCardDto {
    @IsString()
    title: string 
    @IsCreditCard()
    number: string
    @IsString()
    name: string
    @IsNumberString()
    @Length(3)
    cvv:  string
    @Matches('^[0-9]{2}/[0-9]{2}$')
    expirationDate:  string
    @IsString()
    password: string
    @IsBoolean()
    isVirtual:  boolean
    @IsString()
    @IsIn(["CREDIT","DEBT","BOTH"])
    type: "CREDIT" | "DEBT" | "BOTH" 
}
