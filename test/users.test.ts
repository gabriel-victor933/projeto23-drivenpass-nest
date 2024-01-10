import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TestFactories } from './factories';

describe('Users integration tests', () => {
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

  it('/register sign up should return CONFLICT if email is in use', async () => {
    const user = await testFactories.insertUserInDb();

    const res = await request(app.getHttpServer()).post('/register/sign-up').send({
      email: user.email,
      password: '123ADad+-',
    });

    expect(res.statusCode).toBe(409);
  });

  it('/register sign up should return OK', async () => {
    const user = testFactories.createUser();
    const res = await request(app.getHttpServer())
      .post('/register/sign-up')
      .send({
        email: user.email,
        password: user.password + '1aA-',
      });

    expect(res.statusCode).toBe(201);
  });

  it('register sign-up should return UNAUTHORIZED', async () => {
    const user = await testFactories.insertUserInDb();

    const res = await request(app.getHttpServer())
      .post('/register/sign-in')
      .send({
        email: user.email,
        password: user.password + Math.random() * 10,
      });

    expect(res.statusCode).toBe(401);
  });

  it('register sign-up should return OK and JWT token', async () => {
    const user = await testFactories.insertUserInDb();
    const res = await request(app.getHttpServer())
      .post('/register/sign-in')
      .send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });
});
