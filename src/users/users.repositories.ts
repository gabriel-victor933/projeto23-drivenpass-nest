import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersRepositories {
    constructor(private readonly prisma: PrismaService){}

    create(createUserDto: CreateUserDto) {
        return this.prisma.user.create({ data: createUserDto });
    }

    findByEmail(email: string){
        return this.prisma.user.findUnique({where: {email}})
    }


    findAll() {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}