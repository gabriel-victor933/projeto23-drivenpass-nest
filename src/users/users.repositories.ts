import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepositories {

    constructor(private readonly prisma: PrismaService){}

    create(email: string, password: string){
        return this.prisma.user.create({
            data: {
                email,
                password
            }
        })
    }
}