import { PrismaService } from 'src/prisma/prisma.service';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import Cryptr from 'cryptr';

export class TestFactories {
  private prisma: PrismaService;
  private readonly jwt: JwtService = new JwtService();
  ROUND: number = 10;
  private cryptr = new Cryptr(process.env.SECRET);
  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async cleanDb() {
    await this.prisma.user.deleteMany();
  }

  createUser() {
    return {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 13 }) + '1aA+',
    };
  }

  async insertUserInDb() {
    const user = this.createUser();
    const result = await this.prisma.user.create({
      data: { ...user, password: await bcrypt.hash(user.password, this.ROUND) },
    });
    return user;
  }

  async generateSubscription() {
    const user = this.createUser();
    const result = await this.prisma.user.create({
      data: { ...user, password: await bcrypt.hash(user.password, this.ROUND) },
    });

    return {
      token: await this.jwt.sign(
        { userId: result.id, email: result.email },
        { secret: process.env.SECRET },
      ),
    };
  }

  async verifyToken(token: string) {
    return this.jwt.verifyAsync(token, {
      secret: process.env.SECRET,
    });
  }

  createCredentials() {
    return {
      url: faker.internet.url(),
      title: faker.lorem.word(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };
  }

  async insertCredentialsInDb(token: string) {
    const payload = await this.verifyToken(token);
    const credential = this.createCredentials();
    credential.password = this.cryptr.encrypt(credential.password);
    return await this.prisma.credential.create({
      data: { ...credential, userId: payload.userId },
    });
  }

  createNote() {
    return {
      title: faker.word.noun(),
      text: faker.word.words({ count: { min: 3, max: 10 } }),
    };
  }

  async insertNoteInDb(token: string) {
    const payload = await this.verifyToken(token);
    const note = this.createNote();
    return await this.prisma.note.create({
      data: { ...note, userId: payload.userId },
    });
  }

  createCard() {
    return {
      title: faker.word.noun(),
      number: faker.finance.creditCardNumber('visa'),
      name: faker.person.firstName(),
      cvv: faker.finance.creditCardCVV(),
      expirationDate: '2027/12',
      password: faker.internet.password(),
      isVirtual: true,
      type: faker.helpers.arrayElement(['CREDIT', 'DEBT', 'BOTH']) as
        | 'CREDIT'
        | 'DEBT'
        | 'BOTH',
    };
  }

  async insertCardInDb(token: string) {
    const payload = await this.verifyToken(token);
    const card = this.createCard();
    card.cvv = this.cryptr.encrypt(card.cvv);
    card.password = this.cryptr.encrypt(card.password);

    return await this.prisma.card.create({
      data: {
        ...card,
        userId: payload.userId,
        number: parseInt(card.number),
        expirationDate: new Date(
          parseInt('20' + card.expirationDate.slice(-2)),
          parseInt(card.expirationDate.slice(0, 2)) - 1,
        ),
      },
    });
  }

  createWifi() {
    return {
      title: faker.word.noun(),
      network: faker.internet.mac(),
      password: faker.internet.password(),
    };
  }

  async insertWifiInDb(token: string) {
    const payload = await this.verifyToken(token);
    const wifi = this.createWifi();
    return await this.prisma.wifi.create({
      data: {
        ...wifi,
        userId: payload.userId,
      },
    });
  }

  createLicense() {
    return {
      title: faker.word.noun(),
      software: faker.commerce.productName(),
      version: faker.number.int().toString(),
      key: faker.internet.password(),
    };
  }

  async insertLicenseInDb(token: string) {
    const payload = await this.verifyToken(token);
    const license = this.createLicense();
    return await this.prisma.license.create({
      data: {
        ...license,
        userId: payload.userId,
      },
    });
  }
}
