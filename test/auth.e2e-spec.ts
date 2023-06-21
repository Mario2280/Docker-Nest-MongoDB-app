import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { AuthDto } from 'src/auth/auth.dto';




const loginDto: AuthDto = {
  login: 'asd@mail.com',
  password: '123qwe'
}


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();


    const { body } = await request(app.getHttpServer())
    .post('/auth/login')
    .send(loginDto);

    token = body.acces_token;
    
  });


  afterAll(() => {
    disconnect();
  });

  it('/auth/login (POST) correct',  (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
    	.send(loginDto)
      .expect(200)
      .then(({body} : request.Response) => {
				expect(body).toHaveProperty('acces_token');
        done();
      });
  });
	it('/auth/login (POST) failed',  (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
    	.send({...loginDto, password: '123ewr'})
      .expect(401)
      .then(({body} : request.Response) => {
				expect(body).toHaveProperty('error');
        done();
      });
  });
  
});
