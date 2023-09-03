import { IsString, IsUrl } from "class-validator"

export class CreateCredentialDto {
    @IsString()
    title: string
    @IsString()
    username: string
    @IsString()
    password: string
    @IsUrl()
    url: string
}
