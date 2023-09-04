import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TestFactories } from './factories';
import { JwtModule } from '@nestjs/jwt';

describe('App Integration Test', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService()
  let testFactories: TestFactories = new TestFactories(prisma)
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(PrismaService).useValue(prisma).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
    await testFactories.cleanDb()

  });

  it('POST /credentials should return UNAUTHORIZED without token', async () => {
    const res = await request(app.getHttpServer()).post("/credentials").send({})

    expect(res.statusCode).toBe(401)
  });

  it('POST /credentials should return BAD REQUEST without VALID BODY', async () => {
    const {token} = await testFactories.generateSubscription()

    const res = await request(app.getHttpServer())
    .post("/credentials")
    .set("Authorization",`Bearer ${token}`)
    .send({})

    expect(res.statusCode).toBe(400)
  });
});
