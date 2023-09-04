import { PrismaService } from "src/prisma/prisma.service";
import {faker} from "@faker-js/faker"
import * as bcrypt from "bcrypt"

export class TestFactories {
    private prisma: PrismaService
    ROUND: number = 10
    constructor(prisma: PrismaService){
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
        console.log(result)
        return user
    }
}