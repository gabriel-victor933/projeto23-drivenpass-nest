import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { CredentialsRepositories } from './credential.repositories';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsService {
  cryptr =  new Cryptr(process.env.SECRET)
  constructor(private readonly credentialRepositories: CredentialsRepositories){
  }

  async create(createCredentialDto: CreateCredentialDto,userId: number) {
    const encryptPassword = this.cryptr.encrypt(createCredentialDto.password)
    return await this.credentialRepositories.create({...createCredentialDto,password: encryptPassword},userId);
  }

  findAll() {
    return `This action returns all credentials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credential`;
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  remove(id: number) {
    return `This action removes a #${id} credential`;
  }
}
