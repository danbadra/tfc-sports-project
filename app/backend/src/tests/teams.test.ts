import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import TeamModel from '../models/teamsModel'
import mockTeamsList from './mocks/teams.mock';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Fluxo Teams', async () => {

  beforeEach(async () => { sinon.restore() })

  it('1. Testa se findAll retorna todos os times com sucesso', async () => {
    sinon.stub(TeamModel.prototype, 'findAll').resolves(mockTeamsList);
    
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.eq(200);
    expect(response.body).to.be.deep.equal(mockTeamsList);
  });

  it('2. Testa se findAll retorna erro 400 quando houver erro do banco de dados', async () => {
    sinon.stub(TeamModel.prototype, 'findAll').resolves();
    
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.eq(400);
    expect(response.body).to.be.deep.equal({message: 'No team found'});
  });

  it('3. Testa se getTeamById retorna um time com sucesso', async () => {
    sinon.stub(TeamModel.prototype, 'findById').resolves(mockTeamsList[0]);
    
    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.eq(200);
    expect(response.body).to.be.deep.equal(mockTeamsList[0]);
  });

  it('4. Testa se getTeamById retorna um erro 400 caso o id pesquisado não exista', async () => {
    sinon.stub(TeamModel.prototype, 'findById').resolves(null)
    
    const response = await chai.request(app).get('/teams/99');

    expect(response.status).to.eq(400);
    expect(response.body).to.be.deep.equal({message: 'Team 99 not found'});
  });
});
