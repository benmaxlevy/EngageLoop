import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', pass: 'password' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', 1);
        expect(res.body).toHaveProperty('username', 'admin');
      });
  });

  it('/auth/login (POST) unauthorized', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', pass: 'wrongpass' })
      .expect(401);
  });

  afterEach(async () => {
    await app.close();
  });
});
