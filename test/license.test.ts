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

  it('POST /licenses should return UNAUTHORIZED without token', async () => {
    const res = await request(app.getHttpServer()).post('/licenses').send({});

    expect(res.statusCode).toBe(401);
  });

  it('POST /licenses should return BAD REQUEST without VALID BODY', async () => {
    const { token } = await testFactories.generateSubscription();

    const res = await request(app.getHttpServer())
      .post('/licenses')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(400);
  });

  it('POST /licenses should return CONFLICT if title is already in use', async () => {
    const { token } = await testFactories.generateSubscription();
    const license = await testFactories.insertLicenseInDb(token);

    const res = await request(app.getHttpServer())
      .post('/licenses')
      .set('Authorization', `Bearer ${token}`)
      .send(license);
    expect(res.statusCode).toBe(409);
  });

  it('POST /licenses should return CREATE', async () => {
    const { token } = await testFactories.generateSubscription();
    const license = testFactories.createLicense();

    const res = await request(app.getHttpServer())
      .post('/licenses')
      .set('Authorization', `Bearer ${token}`)
      .send(license);

    expect(res.statusCode).toBe(201);
  });

  it('GET /licenses should return NOT FOUND if there is no card', async () => {
    const { token } = await testFactories.generateSubscription();

    const res = await request(app.getHttpServer())
      .get('/licenses')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });

  it('GET /license should return all Licenses', async () => {
    const { token } = await testFactories.generateSubscription();
    const license = testFactories.createLicense();
    await request(app.getHttpServer())
      .post('/licenses')
      .set('Authorization', `Bearer ${token}`)
      .send(license);
    const res = await request(app.getHttpServer())
      .get('/licenses')
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

  it('GET /licenses/:id should return specific License', async () => {
    const { token } = await testFactories.generateSubscription();
    const license = await testFactories.insertLicenseInDb(token);

    const res = await request(app.getHttpServer())
      .get(`/licenses/${license.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        key: expect.any(String),
        software: expect.any(String),
        title: expect.any(String),
        version: expect.any(String),
      }),
    );
  });
});
