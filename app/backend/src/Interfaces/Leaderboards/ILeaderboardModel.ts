import IMatch from '../Matches/IMatch';

export interface ILeaderboardModel {
  collectMatchesData(): Promise<IMatch[]>,
}
