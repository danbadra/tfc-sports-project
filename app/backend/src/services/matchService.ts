import { NewEntity } from '../Interfaces/INewEntity';
// import { Match } from '../types/newMatchType';
import { Update } from '../types/updateType';
import IMatch from '../Interfaces/Matches/IMatch';
import MatchModel from '../models/matchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/teamsModel';

const noMatchFound = 'No match found';

export default class MatchsService {
  protected matchModel = new MatchModel();
  protected teamModel = new TeamModel();

  public async createMatch(newMatch: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }

    const existingHomeTeam = await this.teamModel.findById(newMatch.homeTeamId);
    const existingAwayTeam = await this.teamModel.findById(newMatch.awayTeamId);

    if (!existingHomeTeam || !existingAwayTeam) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }

    const newmatch = await this.matchModel.createMatch(newMatch);
    return { status: 'SUCCESSFUL', data: newmatch };
  }

  public async findAllMatches(inProgress: string | undefined): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAllMatches();

    if (!allMatches) return { status: 'NOT_FOUND', data: { message: noMatchFound } };

    if (inProgress) {
      const filteredMatches = allMatches
        .filter((match) => match.inProgress.toString() === inProgress);
      return { status: 'SUCCESSFUL', data: filteredMatches };
    }

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<IMatch> | string> {
    const finishedMatch = await this.matchModel.finishMatch(id);
    console.log(finishedMatch);
    if (!finishedMatch) {
      return noMatchFound;
    }
    return 'Finished';
  }

  public async updateMatch(id: number, update: Update): Promise<ServiceResponse<IMatch> | string> {
    const updatedMatch = await this.matchModel.updateMatch(id, update);
    if (!updatedMatch) {
      return noMatchFound;
    }
    return 'Updated';
  }
}
