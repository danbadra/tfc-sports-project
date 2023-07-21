import { ILeaderboardModel } from '../Interfaces/Leaderboards/ILeaderboardModel';
// import SequelizeMatch from '../database/models/SequelizeMatch';
// import SequelizeTeam from '../database/models/SequelizeTeam';
// import IMatch from '../Interfaces/Matches/IMatch';
import MatchModel from './matchModel';
import ILeaderboardMatch from '../Interfaces/Leaderboards/ILeaderboardMatch';

export default class LeaderboardModel implements ILeaderboardModel {
  constructor(
    private matchModel = new MatchModel(),
  ) { }

  public async collectMatchesData(): Promise<ILeaderboardMatch[]> {
    const allMatches = await this.matchModel.findAllMatches() as unknown as ILeaderboardMatch[];
    return allMatches;
  }
}
