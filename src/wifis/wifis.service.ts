import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateWifiDto } from './dto/create-wifi.dto';
import { UpdateWifiDto } from './dto/update-wifi.dto';
import { WifisRepositories } from './wifis.repositories';

@Injectable()
export class WifisService {
  constructor(private readonly wifisRepositories: WifisRepositories){}

  async create(createWifiDto: CreateWifiDto, userId: number) {
    return await this.wifisRepositories.createWifi(createWifiDto,userId);
  }

  async findAll(userId: number) {
    const wifis = await this.wifisRepositories.findAll(userId)
    if(wifis.length === 0) throw new NotFoundException("wifis not found")
    return wifis;
  }

  async findOne(id: number, userId: number) {
    const wifi = await this.wifisRepositories.findOne(id)
    if(!wifi) throw new NotFoundException("wifi not found")
    if(wifi.userId !== userId) throw new UnauthorizedException("wifi doenst belong to user")
    delete wifi.userId
    return wifi;
  }

  async update(id: number, updateWifiDto: UpdateWifiDto,userId: number) {
    await this.findOne(id,userId)
    return await this.wifisRepositories.updateOne(id,updateWifiDto);
  }

  async remove(id: number, userId: number) {
    await this.findOne(id,userId)
    return this.wifisRepositories.deleteOne(id);
  }
}
