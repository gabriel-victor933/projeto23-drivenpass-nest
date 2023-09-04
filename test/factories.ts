import { PrismaService } from "src/prisma/prisma.service";
import {faker} from "@faker-js/faker"
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

export class TestFactories {
    private prisma: PrismaService
    private readonly jwt: JwtService = new JwtService()
    ROUND: number = 10
    constructor(prisma: PrismaService,){
        this.prisma = prisma
    }

    async cleanDb(){
     await this.prisma.user.deleteMany();
    }

    createUser(){
        return  {
                email: faker.internet.email(),
                password: faker.internet.password({length: 13}) + "1aA+"
            }
    }

    async insertUserInDb(){
        const user = this.createUser()
        const result = await this.prisma.user.create({
            data:{...user,password: await bcrypt.hash(user.password,this.ROUND)}
        })
        return user
    }

    async generateSubscription(){
        const user = this.createUser()
        const result = await this.prisma.user.create({
            data:{...user,password: await bcrypt.hash(user.password,this.ROUND)}
        })

        return {token: await this.jwt.sign({ userId: result.id, email: result.email },{secret: process.env.SECRET})}
    }
}