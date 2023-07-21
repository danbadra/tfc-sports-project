import ILeaderboard from '../Interfaces/Leaderboards/ILeaderboard';
import LeaderboardModel from '../models/lbModel';
import ILeaderboardMatch from '../Interfaces/Leaderboards/ILeaderboardMatch';

type AwayTeamInfo = {
  data: ILeaderboardMatch[],
  teamNames: string[],
  goalsFavor: number[],
  goalsOwn: number[],
};

type Blah = {
  points: number[],
  losses: number[],
  wins: number[],
  draws: number[],
  games: number[],
  saldo: number[],
  aproveitamento: number[],
};

const awayLeaderBoard: ILeaderboard[] = [];

export default class AwayLeaderboardsService {
  protected leaderboardModel = new LeaderboardModel();

  public async getAwayTeamInfo(): Promise<AwayTeamInfo> {
    const matchesData = await this.leaderboardModel.collectMatchesData();
    // 1. Retorna um array com todos os nomes de times
    const allTeamNames = matchesData
      .map((match) => match.dataValues.awayTeam.teamName)
      .filter((teamName, index, array) => array.indexOf(teamName) === index);
    // 2. Retorna a soma de gols que um time marcou (homeTeamGoals):
    const proGoals = allTeamNames.map((team) => {
      const teamGoalsSum = matchesData
        .filter((match) => match.dataValues.awayTeam.teamName === team)
        .reduce((total, match) => total + match.dataValues.awayTeamGoals, 0);
      return teamGoalsSum;
    });
    // 3. Retorna a soma de gols que um time sofreu (awayTeamGoals):
    const conGoals = allTeamNames.map((team) => {
      const teamGoalsSum = matchesData
        .filter((match) => match.dataValues.awayTeam.teamName === team)
        .reduce((total, match) => total + match.dataValues.homeTeamGoals, 0);
      return teamGoalsSum;
    });
    return { data: matchesData, teamNames: allTeamNames, goalsFavor: proGoals, goalsOwn: conGoals };
  }

  // 4. Retorna um array de number[] com todos os Favor Goals de cada time
  public async getFavorGoals(): Promise<Array<number[]>> {
    const { data, teamNames } = await this.getAwayTeamInfo();
    const allTeamFavorGoals: Array<number[]> = [];
    teamNames.forEach((teamName) => {
      const teamGoals: number[] = [];
      data.forEach((match) => {
        if (match.dataValues.awayTeam.teamName === teamName) {
          teamGoals.push(match.dataValues.awayTeamGoals);
        }
      });
      allTeamFavorGoals.push(teamGoals);
    });
    return allTeamFavorGoals;
  }

  // 5. Retorna um array de number[] com todos os Own Goals de cada time
  public async getOwnGoals(): Promise<Array<number[]>> {
    const { data, teamNames } = await this.getAwayTeamInfo();
    const allTeamOwnGoals: Array<number[]> = [];
    teamNames.forEach((teamName) => {
      const teamGoals: number[] = [];
      data.forEach((match) => {
        if (match.dataValues.awayTeam.teamName === teamName) {
          teamGoals.push(match.dataValues.homeTeamGoals);
        }
      });
      allTeamOwnGoals.push(teamGoals);
    });
    return allTeamOwnGoals;
  }

  // 6. Retorna um array de arrays. Cada número em um subArray é o resultado de cada partida.
  public async getMatchesResults(): Promise<Array<number[]>> {
    const { data, teamNames } = await this.getAwayTeamInfo();
    const allMatchesResults: Array<number[]> = [];
    teamNames.forEach((teamName) => {
      const teamGoals: number[] = [];
      data.forEach((match) => {
        if (match.dataValues.awayTeam.teamName === teamName) {
          teamGoals.push(match.dataValues.awayTeamGoals - match.dataValues.homeTeamGoals);
        }
      });
      allMatchesResults.push(teamGoals);
    });
    return allMatchesResults;
  }

  // 7. Retorna um array de números. Cada número é o saldo de gols de cada time.
  public async getSaldoDeGols(): Promise<number[]> {
    const allMatchesResults = await this.getMatchesResults();
    const allSaldoDeGols: Array<number> = [];
    allMatchesResults.forEach((teamMatchResults) => {
      const saldoDeGols = teamMatchResults.reduce((acc, curr): number => acc + curr);
      return allSaldoDeGols.push(saldoDeGols);
    });
    return allSaldoDeGols;
  }

  // 8. Retorna um array de arrays. Cada número em um subArray é a pontuação para uma match.
  public async getAllPoints(): Promise<Array<number[]>> {
    const allMatchesResults = await this.getMatchesResults();

    const allPointsList: Array<number[]> = [];
    allMatchesResults.forEach((teamMatchResults) => {
      const pointsPerMatch: number[] = [];
      teamMatchResults.forEach((teamMatchResult) => {
        if (teamMatchResult < 0) pointsPerMatch.push(0);
        if (teamMatchResult === 0) pointsPerMatch.push(1);
        if (teamMatchResult > 0) pointsPerMatch.push(3);
      });
      return allPointsList.push(pointsPerMatch);
    });
    return allPointsList;
  }

  // 9. Retorna um array de números. Cada número é o total de pontos de cada time.
  public async getTotalPoints(): Promise<number[]> {
    const allPointsList = await this.getAllPoints();
    const totalPointsList: Array<number> = [];
    allPointsList.forEach((teamPointsList) => {
      const teamPoints = teamPointsList.reduce((acc, curr): number => acc + curr);
      return totalPointsList.push(teamPoints);
    });
    return totalPointsList;
  }

  // 10. Retorna uma array de números. Cada número é o total de partidas jogadas de cada time.
  public async getTotalGamesPlayed(): Promise<number[]> {
    const allPointsList = await this.getAllPoints();
    const totalGamesPlayed = allPointsList.map((teamPointsList: number[]) => teamPointsList.length);
    return totalGamesPlayed;
  }

  // 10. Retorna uma array de números. Cada número é o total de partidas jogadas de cada time.
  public async getTotalWins(): Promise<number[]> {
    const allPointsList = await this.getAllPoints();
    const allWinsList = allPointsList
      .map((teamPointsList: number[]) => teamPointsList
        .filter((match) => (match === 3)));
    const totalWins = allWinsList.map((wins) => wins.length);
    return totalWins;
  }

  // 11. Retorna uma array de números. Cada número é o total de derrotas de cada time.
  public async getTotalLosses(): Promise<number[]> {
    const allPointsList = await this.getAllPoints();
    const allLossesList = allPointsList
      .map((teamPointsList: number[]) => teamPointsList
        .filter((match) => (match === 0)));
    const totalLosses = allLossesList.map((loss) => loss.length);
    return totalLosses;
  }

  // 12. Retorna uma array de números. Cada número é o total de empates de cada time.
  public async getTotalDraws(): Promise<number[]> {
    const allPointsList = await this.getAllPoints();
    const allDrawsList = allPointsList
      .map((teamPointsList: number[]) => teamPointsList
        .filter((match) => (match === 1)));
    const totalDraws = allDrawsList.map((draw) => draw.length);
    return totalDraws;
  }

  // 13. Retorna uma array de aproveitamentos.
  public async getAproveitamento(): Promise<number[]> {
    const totalPoints = await this.getTotalPoints();
    const totalGames = await this.getTotalGamesPlayed();
    const aproveitamento = totalGames
      .map((games, i) => Number(((totalPoints[i] / (games * 3)) * 100).toFixed(2)));
    return aproveitamento;
  }

  public async getNecessaryMethods(): Promise<Blah> {
    return {
      points: await this.getTotalPoints(),
      losses: await this.getTotalLosses(),
      wins: await this.getTotalWins(),
      draws: await this.getTotalDraws(),
      games: await this.getTotalGamesPlayed(),
      saldo: await this.getSaldoDeGols(),
      aproveitamento: await this.getAproveitamento(),
    };
  }

  //  14. Monta o objeto (linha do lb) e coloca no array
  public async assembleLines(): Promise<ILeaderboard[]> {
    const { teamNames, goalsFavor, goalsOwn } = await this.getAwayTeamInfo();
    const info = await this.getNecessaryMethods();

    teamNames.forEach(async (team, i) => {
      const lbLine = { name: teamNames[i],
        totalPoints: info.points[i],
        totalGames: info.games[i],
        totalVictories: info.wins[i],
        totalDraws: info.draws[i],
        totalLosses: info.losses[i],
        goalsFavor: goalsFavor[i],
        goalsOwn: goalsOwn[i],
        goalsBalance: info.saldo[i],
        efficiency: info.aproveitamento[i],
      };
      awayLeaderBoard.push(lbLine);
    });
    return awayLeaderBoard;
  }

  // 15. Ordena os os objetos por prioridade
  public async sortAwayLb(): Promise<ILeaderboard[]> {
    await this.assembleLines();
    awayLeaderBoard.sort((teamA, teamB) => (
      teamB.totalPoints - teamA.totalPoints
      || teamB.totalVictories - teamA.totalVictories
      || teamB.goalsBalance - teamA.goalsBalance
      || teamB.goalsFavor - teamA.goalsFavor
      || teamB.goalsOwn - teamA.goalsOwn
    ));
    return awayLeaderBoard;
  }
}
