import { IsString } from "class-validator";

export class EraseDto {
    @IsString()
    password: string
}