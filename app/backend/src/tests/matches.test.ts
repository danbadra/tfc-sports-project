import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as mock from './mocks/matches.mock';
import * as authMock from './mocks/login.mock';
import jwt from '../utils/JWT';
import { app } from '../app';
import MatchModel from '../models/matchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Fluxo Matches', () => {
  beforeEach(async () => { sinon.restore() } );

    it('Testa findAllMatches', async function() {
      sinon.stub(MatchModel.prototype, 'findAllMatches').resolves(mock.teams);

      const response = await chai.request(app).get('/matches');

      expect(response.status).to.eq(200);
      expect(response.body).to.be.deep.equal(mock.teams);
    });

    it('Testa findAllMatches em progresso', async function () {
      sinon.stub(MatchModel.prototype, 'findAllMatches').resolves(mock.InProgress);

      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.eq(200);
      expect(response.body).to.be.deep.equal(mock.InProgress);
    })

    it('Testa findAllMatches finalizadas', async function () {
      sinon.stub(MatchModel.prototype, 'findAllMatches').resolves(mock.InProgress);

      const response = await chai.request(app).get('/matches?inProgress=true');

      expect(response.status).to.eq(200);
      expect(response.body).to.be.deep.equal(mock.InProgress);
    })

    it('Testa createMatch', async function () {
      sinon.stub(MatchModel.prototype, 'createMatch').resolves(mock.createMatch);
      sinon.stub(jwt, 'decodeToken').returns(authMock.user);

      const response = await chai.request(app)
        .post('/matches')
        .set('authorization', authMock.authHeader)
        .send({
          homeTeamId: 2,
          homeTeamGoals: 1,
          awayTeamId: 1,
          awayTeamGoals: 2,
        });

      expect(response.status).to.be.eq(201);
      expect(response.body).to.be.deep.eq(mock.createMatch);
      })

      it('Testa createMatch com dois times iguais', async function () {
        sinon.stub(MatchModel.prototype, 'createMatch').throws();
        sinon.stub(jwt, 'decodeToken').returns(authMock.user);
  
        const response = await chai.request(app)
          .post('/matches')
          .set('authorization', authMock.authHeader)
          .send({
            homeTeamId: 2,
            homeTeamGoals: 1,
            awayTeamId: 2,
            awayTeamGoals: 1,
          });
  
          expect(response.status).to.eq(422);
          expect(response.body).to.be.deep.equal({message: 'It is not possible to create a match with two equal teams'});
      })

      it('Testa createMatch com time inexistente', async function () {
        sinon.stub(MatchModel.prototype, 'createMatch').throws();
        sinon.stub(jwt, 'decodeToken').returns(authMock.user);
  
        const response = await chai.request(app)
          .post('/matches')
          .set('authorization', authMock.authHeader)
          .send({
            homeTeamId: 99999,
            homeTeamGoals: 1,
            awayTeamId: 2,
            awayTeamGoals: 1,
          });
  
          expect(response.status).to.eq(404);
          expect(response.body).to.be.deep.equal({message: 'There is no team with such id!'});
      })

      it('Testa updateMatch', async function () {
        sinon.stub(MatchModel.prototype, 'updateMatch').resolves(mock.updated);
        sinon.stub(jwt, 'decodeToken').returns(authMock.user);
  
        const response = await chai.request(app)
        .patch('/matches/1')
        .set('authorization', authMock.authHeader)
        .send({
          homeTeamGoals: 4,
          awayTeamGoals: 3,
        });
  
        expect(response.status).to.eq(200);
        expect(response.body).to.be.deep.equal(mock.updated);
      })
    });