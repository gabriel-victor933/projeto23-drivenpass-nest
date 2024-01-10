import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TestFactories } from './factories';
import { JwtModule } from '@nestjs/jwt';

describe('Credentials Integration Test', () => {
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

  it('POST /credentials should return UNAUTHORIZED without token', async () => {
    const res = await request(app.getHttpServer())
      .post('/credentials')
      .send({});

    expect(res.statusCode).toBe(401);
  });

  it('POST /credentials should return BAD REQUEST without VALID BODY', async () => {
    const { token } = await testFactories.generateSubscription();

    const res = await request(app.getHttpServer())
      .post('/credentials')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(400);
  });

  it('POST /credentials should return CONFLICT if title is already in use', async () => {
    const { token } = await testFactories.generateSubscription();
    const credential = await testFactories.insertCredentialsInDb(token);

    const res = await request(app.getHttpServer())
      .post('/credentials')
      .set('Authorization', `Bearer ${token}`)
      .send(credential);
    expect(res.statusCode).toBe(409);
  });

  it('POST /credentials should return CREATE', async () => {
    const { token } = await testFactories.generateSubscription();
    const credential = testFactories.createCredentials();
    const res = await request(app.getHttpServer())
      .post('/credentials')
      .set('Authorization', `Bearer ${token}`)
      .send(credential);

    expect(res.statusCode).toBe(201);
  });

  it('GET /credentials should return NOT FOUND if there is no card', async () => {
    const { token } = await testFactories.generateSubscription();

    const res = await request(app.getHttpServer())
      .get('/credentials')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });

  it('GET /credentials should return all credentials', async () => {
    const { token } = await testFactories.generateSubscription();
    const credential = testFactories.createCredentials();
    await request(app.getHttpServer())
      .post('/credentials')
      .set('Authorization', `Bearer ${token}`)
      .send(credential);

    const res = await request(app.getHttpServer())
      .get('/credentials')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
        }),
      ]),
    );
  });

  it('GET /credentials/:id should return specific credential', async () => {
    const { token } = await testFactories.generateSubscription();
    const credential = await testFactories.insertCredentialsInDb(token);

    const res = await request(app.getHttpServer())
      .get(`/credentials/${credential.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        url: expect.any(String),
        title: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
      }),
    );
  });
});
