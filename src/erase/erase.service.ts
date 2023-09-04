import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepositories } from 'src/users/users.repositories';
import * as bcrypt from "bcrypt"

@Injectable()
export class EraseService {
    constructor(private readonly usersRepositories: UsersRepositories ){}

    async deleteAccount(password: string,userId: number){
        const user = await this.usersRepositories.findById(userId);
        const isValid = await bcrypt.compare(password,user.password)
        //if(!isValid) throw new UnauthorizedException("invalid password");
        await this.usersRepositories.deleteAll(userId);
    }
}
