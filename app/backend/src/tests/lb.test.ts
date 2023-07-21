import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as mock from './mocks/lb.mock'
import { app } from '../app';
import MatchesModel from '../models/lbModel';
import ILeaderboardMatch from '../Interfaces/Leaderboards/ILeaderboardMatch'

chai.use(chaiHttp);

const { expect } = chai;

describe('Fluxo LEADERBOARD ', () => {
  beforeEach(async () => { sinon.restore() } );

    it('Testa collectMatchesData para homeLb', async function() {
      sinon.stub(MatchesModel.prototype, 'collectMatchesData').resolves(mock.matches as unknown as ILeaderboardMatch[]);

      const response = await chai.request(app).get('/leaderboard/home');

      expect(response.status).to.eq(200);
      expect(response.body).to.be.deep.equal(mock.homeLb);
    });

    it('Testa collectMatchesData para awayLb', async function() {
      sinon.stub(MatchesModel.prototype, 'collectMatchesData').resolves(mock.matches as unknown as ILeaderboardMatch[]);

      const response = await chai.request(app).get('/leaderboard/away');

      expect(response.status).to.eq(200);
      expect(response.body).to.be.deep.equal(mock.awayLb);
    });
});