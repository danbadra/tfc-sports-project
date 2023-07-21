import IMatch from '../Matches/IMatch';

export default interface LeaderboardMatch extends IMatch {
  dataValues: {
    id: number,
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
    inProgress: boolean,
    homeTeam: {
      teamName: string,
    },
    awayTeam: {
      teamName: string,
    },
  }
}
