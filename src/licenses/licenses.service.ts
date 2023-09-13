import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { LicensesRepositories } from './licenses.repositories';

@Injectable()
export class LicensesService {
  constructor(private readonly licensesRepositories: LicensesRepositories){}

  async create(createLicenseDto: CreateLicenseDto, userId: number) {
    return this.licensesRepositories.create(createLicenseDto,userId);
  }

  async findAll(userId: number) {
    const licenses = await this.licensesRepositories.findAll(userId);
    if(licenses.length== 0) throw new NotFoundException("Licenses not found")
    return licenses
  }

  async findOne(id: number,userId: number) {
    const license = await this.licensesRepositories.findOne(id)
    if(!license) throw new NotFoundException("license not found")
    if(license.userId != userId) throw new UnauthorizedException()
    delete license.userId
    return license;
  }

  async update(id: number, updateLicenseDto: UpdateLicenseDto,userId: number) {
    await this.findOne(id,userId)
    return await this.licensesRepositories.updateOne(id,updateLicenseDto);
  }

  async remove(id: number,userId: number) {
    await this.findOne(id,userId)
    return await this.licensesRepositories.deleteOne(id);
  }
}
