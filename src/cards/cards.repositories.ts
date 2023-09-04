import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Injectable()
export class CardsRepositories {

    constructor(private readonly prisma: PrismaService){}

    create(createCardsDto: CreateCardDto, userId: number){
        return this.prisma.card.create({
            data: {...createCardsDto,
                userId: userId, 
                expirationDate: new Date(parseInt("20"+createCardsDto.expirationDate.slice(-2)),parseInt(createCardsDto.expirationDate.slice(0,2))-1),
            }
        })
    }

    findAll(userId: number){
        return this.prisma.card.findMany({where: {userId}})
    }

    findOne(id: number){
        return this.prisma.card.findUnique({where: {id}})
    }

    deleteOne(id: number){
        return this.prisma.card.delete({where: {id}})
    }

    update(id: number,updateCardDto: UpdateCardDto){

        if(updateCardDto.expirationDate){
            return this.prisma.card.update({
                where: {id},
                data: {...updateCardDto,
                expirationDate: new Date(parseInt("20"+updateCardDto.expirationDate.slice(-2)),parseInt(updateCardDto.expirationDate.slice(0,2))-1)}
            })
        }

        return this.prisma.card.update({
            where: {id},
            data: updateCardDto
        })
    }
}