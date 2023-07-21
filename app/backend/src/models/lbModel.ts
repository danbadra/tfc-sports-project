import { ILeaderboardModel } from '../Interfaces/Leaderboards/ILeaderboardModel';
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
