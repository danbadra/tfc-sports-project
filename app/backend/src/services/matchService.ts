import { NewEntity } from '../Interfaces/INewEntity';
// import { Match } from '../types/newMatchType';
import { Update } from '../types/updateType';
import IMatch from '../Interfaces/Matches/IMatch';
import MatchModel from '../models/matchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

const noMatchFound = 'No match found';

export default class MatchsService {
  protected matchModel = new MatchModel();

  public async createMatch(newMatch: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
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
