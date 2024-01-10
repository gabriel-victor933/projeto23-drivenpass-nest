import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TestFactories } from './factories';
import { JwtModule } from '@nestjs/jwt';

describe('Notes Integration Test', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();
  let testFactories: TestFactories = new TestFactories(prisma);
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

  it('POST /notes should return UNAUTHORIZED without token', async () => {
    const res = await request(app.getHttpServer()).post('/notes').send({});

    expect(res.statusCode).toBe(401);
  });

  it('POST /notes should return BAD REQUEST without VALID BODY', async () => {
    const { token } = await testFactories.generateSubscription();

    const res = await request(app.getHttpServer())
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(400);
  });

  it('POST /notes should return CONFLICT if title is already in use', async () => {
    const { token } = await testFactories.generateSubscription();
    const note = await testFactories.insertNoteInDb(token);

    const res = await request(app.getHttpServer())
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(note);
    expect(res.statusCode).toBe(409);
  });

  it('POST /notes should return CREATE', async () => {
    const { token } = await testFactories.generateSubscription();
    const note = testFactories.createNote();
    const res = await request(app.getHttpServer())
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(note);

    expect(res.statusCode).toBe(201);
  });

  it('GET /notes should return NOT FOUND if there is no card', async () => {
    const { token } = await testFactories.generateSubscription();

    const res = await request(app.getHttpServer())
      .get('/notes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });

  it('GET /notes should return all Notes', async () => {
    const { token } = await testFactories.generateSubscription();
    const note = testFactories.createNote();
    await request(app.getHttpServer())
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send(note);

    const res = await request(app.getHttpServer())
      .get('/notes')
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

  it('GET /notes/:id should return specific credential', async () => {
    const { token } = await testFactories.generateSubscription();
    const note = await testFactories.insertNoteInDb(token);

    const res = await request(app.getHttpServer())
      .get(`/notes/${note.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        text: expect.any(String),
      }),
    );
  });
});
