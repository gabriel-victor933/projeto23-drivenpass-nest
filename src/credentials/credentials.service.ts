import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(userId: number) {
    const credentials = await this.credentialRepositories.findAll(userId)
    if(credentials.length === 0) throw new NotFoundException("credentials not found")
    const decryptCredentials = credentials.map((cred) => ({...cred,password: this.cryptr.decrypt(cred.password)}))
    return decryptCredentials;
  }

  async findOne(id: number,userId: number) {
    const credential = await this.checkCredentials(id,userId)
    return {...credential,password: this.cryptr.decrypt(credential.password)};
  }

  update(id: number, updateCredentialDto: UpdateCredentialDto) {
    return `This action updates a #${id} credential`;
  }

  async remove(id: number,userId: number) {
    await this.checkCredentials(id,userId)
    return this.credentialRepositories.deleteOne(id,userId);
  }

  async checkCredentials(id: number,userId: number){
    const credential = await this.credentialRepositories.findOne(id)
    if(!credential) throw new NotFoundException("credential not found")
    if(credential.userId !== userId) throw new ForbiddenException()
    return credential
  }
}
