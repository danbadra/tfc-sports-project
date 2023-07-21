import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as mock from './mocks/login.mock'
import { app } from '../app';
import UserModel from '../models/loginModel';
import jwt from '../utils/JWT';
import * as bc from 'bcryptjs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Fluxo User', () => {
  beforeEach(async () => { sinon.restore() } );

    it('Testa se verifyLogin retorna um token', async function() {
      sinon.stub(UserModel.prototype, 'validateLogin').resolves({ status: 'SUCCESSFUL', token: mock.token});
      sinon.stub(bc, 'compareSync').returns(true);
      sinon.stub(jwt, 'createToken').returns(mock.token);

      const response = await chai.request(app).post('/login').send(mock.payload);

      expect(response.status).to.be.eq(200);
      expect(response.body).to.deep.eq({ token: mock.token })
    });

    it('Testa verifyLogin sem email', async function () {
      const response = await chai.request(app).post('/login').send({ email: '', password: 'validpassword' });

      expect(response.status).to.be.eq(400);
      expect(response.body).to.have.property('message', 'All fields must be filled')
    })

    it('Testa verifyLogin sem password', async function () {
      const response = await chai.request(app).post('/login').send({ email: 'valid@email.com', password: '' });

      expect(response.status).to.be.eq(400);
      expect(response.body).to.have.property('message', 'All fields must be filled')
    })

    it('Testa verifyLogin com email inválido', async function () {
      const response = await chai.request(app).post('/login').send(mock.invalidEmail);

      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.property('message', 'Invalid email or password');
    })

    it('Testa verifyLogin com password inválido', async function () {
      const response = await chai.request(app).post('/login').send(mock.invalidPassword);

      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.property('message', 'Invalid email or password');
    })

    it('Testa getUserToken sem Token', async function() {
      const response = await chai.request(app)
        .get('/login/role')

      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.property('message', 'Token not found');
    })

    it('Testa getUserToken sem Bearer', async function() {
      const response = await chai.request(app)
        .get('/login/role')
        .set('authorization', mock.token);

      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.property('message', 'Token must be a valid token');
    })

    it('Testa getUserToken com Token inválido', async function() {
      const response = await chai.request(app)
        .get('/login/role')
        .set('authorization','Bearer '+ mock.user.email);

      expect(response.status).to.be.eq(401);
      expect(response.body).to.have.property('message', 'Token must be a valid token');
    })
})