import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegisterRepositories {

    constructor(private readonly prisma: PrismaService){}

    create(email: string, password: string){
        return this.prisma.user.create({
            data: {
                email,
                password
            }
        })
    }

    findByEmail(email: string){
        return this.prisma.user.findUnique({where: {email}})
    }

    findById(id: number){
        return this.prisma.user.findUnique({where: {id}})
    }

    deleteAll(id: number){
        return this.prisma.user.delete({where: {id} })
    }
}