import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';

@Injectable()
export class LicensesRepositories {
    constructor(private readonly prisma: PrismaService){}

    create(createLicense: CreateLicenseDto,userId: number){
        return this.prisma.license.create({
            data: {...createLicense,userId}
        })
    }

    findAll(userId: number){
        return this.prisma.license.findMany({
            where: {userId}
        })    
    }

    findOne(id: number){
        return this.prisma.license.findUnique({
            where: {id}
        })
    }

    updateOne(id: number,updateLicense: UpdateLicenseDto){
        return this.prisma.license.update({
            where: {id},
            data: {...updateLicense}
        })
    }

    deleteOne(id: number){
        return this.prisma.license.delete({
            where: {id}
        })
    }
}