import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesRepositories {
    constructor(private readonly prisma: PrismaService){}

    create(createNoteDto: CreateNoteDto, userId: number){
        return this.prisma.note.create({
            data: {...createNoteDto, userId}
        })
    }

    findAll(userId: number){
        return this.prisma.note.findMany({where: {userId}})
    }

    findOne(id: number){
        return this.prisma.note.findUnique({where: {id}})
    }

    delete(id: number){
        return this.prisma.note.delete({where: {id}})
    }

    updateOne(id: number, updateNoteDto: UpdateNoteDto){
        return this.prisma.note.update({
            where: {id},
            data: updateNoteDto
        })
    }
}