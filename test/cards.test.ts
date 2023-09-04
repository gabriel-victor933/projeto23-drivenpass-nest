import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TestFactories } from './factories';
import { JwtModule } from '@nestjs/jwt';

describe('Cards Integration Test', () => {
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

  it('POST /cards should return UNAUTHORIZED without token', async () => {
    const res = await request(app.getHttpServer()).post("/cards").send({})

    expect(res.statusCode).toBe(401)
  });

  it('POST /cards should return BAD REQUEST without VALID BODY', async () => {
    const {token} = await testFactories.generateSubscription()

    const res = await request(app.getHttpServer())
    .post("/cards")
    .set("Authorization",`Bearer ${token}`)
    .send({})

    expect(res.statusCode).toBe(400)
  });

  it('POST /cards should return CREATE', async () => {
    const {token} = await testFactories.generateSubscription()
    const card =  testFactories.createCard()
    const res = await request(app.getHttpServer())
    .post("/cards")
    .set("Authorization",`Bearer ${token}`)
    .send(card)
    console.log(res.body)
    expect(res.statusCode).toBe(201)
  });

  it('GET /cards should return all credentials', async () => {
    const {token} = await testFactories.generateSubscription()
    const card =  testFactories.createCard()
    const post = await request(app.getHttpServer())
    .post("/cards")
    .set("Authorization",`Bearer ${token}`)
    .send(card)
    console.log(post.body)
    const res = await request(app.getHttpServer()).get("/cards").set("Authorization",`Bearer ${token}`)
    console.log(res.body)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        title: expect.any(String),
        number: expect.any(String),
        name: expect.any(String),
        cvv: expect.any(String),
        expirationDate: expect.any(String),
        password: expect.any(String),
        isVirtual: expect.any(Boolean),
        type: expect.any(String)
      })
    ]))
  });

  it('GET /cards/:id should return specific credential', async () => {
    const {token} = await testFactories.generateSubscription()
    const card =  await testFactories.insertCardInDb(token)


    const res = await request(app.getHttpServer())
    .get(`/cards/${(card).id}`)
    .set("Authorization",`Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(expect.objectContaining({
        title: expect.any(String),
        number: expect.any(String),
        name: expect.any(String),
        cvv: expect.any(String),
        expirationDate: expect.any(String),
        password: expect.any(String),
        isVirtual: expect.any(Boolean),
        type: expect.any(String)
      })
    )
  });

});
