import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import User from './user.model';
import generateApp from '../../server';
import * as dbTestingHelper from '../../testing/helpers/dbTestingHelper';

const app = generateApp();

beforeAll(async () => {
  await dbTestingHelper.connect();
});

afterEach(async () => {
  await dbTestingHelper.clearDatabase();
});

afterAll(async () => {
  await dbTestingHelper.closeDatabase();
});


describe('user.controller', () => {
  describe('login', () => {
    it('returns 401 for user not found', async () => {
      // create new user
      await User.create(
        {
          email: 'testemail@testbiolerplate.com',
          password: 'password123',
        },
      );

      // send login request with invalid email
      const res = await supertest(app)
        .post('/api/user/login')
        .send({
          email: 'unknownemail@testbiolerplate.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual('Invalid email address.');
    });

    it('returns 401 for invalid password', async () => {
      // create new user
      await User.create(
        {
          email: 'testemail@testbiolerplate.com',
          password: 'password123',
        },
      );

      // send login request with invalid password
      const res = await supertest(app)
        .post('/api/user/login')
        .send({
          email: 'testemail@testbiolerplate.com',
          password: 'false password',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual('Invalid password for email address.');
    });

    it('returns 200 for successful user login', async () => {
      // create new user
      const user = await User.create(
        {
          email: 'testemail@testbiolerplate.com',
          password: 'password123',
        },
      );

      // send login request with valid email and password
      const res = await supertest(app)
        .post('/api/user/login')
        .send({
          email: 'testemail@testbiolerplate.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(200);

      // verify valid jwt token
      const decoded = jwt.verify(res.body.jwtToken, process.env.JWT_SECRET);
      expect(decoded.email).toEqual(user.email);
      expect(Object.keys(decoded)).toContain('exp');
      expect(Object.keys(decoded)).toContain('iat');
      expect(decoded.iat).toBeLessThan(decoded.exp);

      // verify correct user info
      expect(res.body.user.email).toEqual(user.email);
    });
  });
  describe('get', () => {
    test('returns 401 for expired token', async () => {
      // create new user
      const user = await User.create(
        {
          email: 'testemail@testbiolerplate.com',
          password: 'password123',
        },
      );

      // create token that is expired
      const expiredUserToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '0ms' });

      // send login request with valid email and password
      // verify expired token returns 401 error
      const expiredRes = await supertest(app)
        .get('/api/user/')
        .set('Authorization', `jwt ${expiredUserToken}`)
        .send();
      expect(expiredRes.statusCode).toEqual(401);
      expect(expiredRes.body.message).toEqual('Unauthorized');
    });
    test('returns 200 for successful user retrieval', async () => {
      // create new user
      const user = await User.create(
        {
          email: 'testemail@testbiolerplate.com',
          password: 'password123',
        },
      );

      // create valid token
      const expiredUserToken = user.toJwtToken();

      const res = await supertest(app)
        .get('/api/user/')
        .set('Authorization', `jwt ${expiredUserToken}`)
        .send();
                                                                            expect(res.statusCode).toEqual(200);

      // verify correct user info
      expect(res.body.user.email).toEqual(user.email);
    });
  });
});
