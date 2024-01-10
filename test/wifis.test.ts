import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TestFactories } from './factories';

describe('Wifis Integration Test', () => {
  let app: INestApplication;
  const prisma: PrismaService = new PrismaService();
  const testFactories: TestFactories = new TestFactories(prisma);
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    await testFactories.cleanDb();
  });

  it('POST /wifis should return UNAUTHORIZED without token', async () => {
    const res = await request(app.getHttpServer()).post('/wifis').send({});

    expect(res.statusCode).toBe(401);
  });

  it('POST /wifis should return BAD REQUEST without VALID BODY', async () => {
    const { token } = await testFactories.generateSubscription();

    const res = await request(app.getHttpServer())
      .post('/wifis')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(400);
  });

  it('POST /wifis should return CREATE', async () => {
    const { token } = await testFactories.generateSubscription();
    const wifi = testFactories.createWifi();

    const res = await request(app.getHttpServer())
      .post('/wifis')
      .set('Authorization', `Bearer ${token}`)
      .send(wifi);
    console.log(res.body)
    expect(res.statusCode).toBe(201);
  });

  it('GET /wifi should return all Wifis', async () => {
    const { token } = await testFactories.generateSubscription();
    const wifi = testFactories.createWifi();
    await request(app.getHttpServer())
      .post('/wifis')
      .set('Authorization', `Bearer ${token}`)
      .send(wifi);
    const res = await request(app.getHttpServer())
      .get('/wifis')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          id: expect.any(Number),
        }),
      ]),
    );
  });

  it('GET /wifi/:id should return specific Wifi', async () => {
    const { token } = await testFactories.generateSubscription();
    const wifi = await testFactories.insertWifiInDb(token);

    const res = await request(app.getHttpServer())
      .get(`/wifis/${wifi.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        network: expect.any(String),
        password: expect.any(String),
      }),
    );
  });
});
