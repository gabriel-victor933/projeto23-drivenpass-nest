import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWifiDto } from './dto/create-wifi.dto';
import { UpdateWifiDto } from './dto/update-wifi.dto';

@Injectable()
export class WifisRepositories {
  constructor(private readonly prisma: PrismaService) {}

  createWifi(createWifiDto: CreateWifiDto, userId: number) {
    return this.prisma.wifi.create({
      data: { ...createWifiDto, userId },
    });
  }

  findAll(userId: number) {
    return this.prisma.wifi.findMany({
      where: { userId },
    });
  }

  findOne(id: number) {
    return this.prisma.wifi.findUnique({
      where: { id },
    });
  }

  updateOne(id: number, updateDto: UpdateWifiDto) {
    return this.prisma.wifi.update({
      where: { id },
      data: updateDto,
    });
  }

  deleteOne(id: number) {
    return this.prisma.wifi.delete({ where: { id } });
  }
}
