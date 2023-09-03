import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCredentialDto } from "./dto/create-credential.dto";

@Injectable()
export class CredentialsRepositories {
    constructor(private readonly prisma: PrismaService){}

    create(createCredentialDto: CreateCredentialDto, userId: number){
        return this.prisma.credential.create({
            data:{...createCredentialDto, userId}
        })
    }
}