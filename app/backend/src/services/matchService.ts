import IMatch from '../Interfaces/Matches/IMatch';
import MatchModel from '../models/matchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchsService {
  protected matchModel = new MatchModel();

  public async createMatch(match: IMatch): Promise<ServiceResponse<IMatch>> {
    const newmatch = await this.matchModel.createMatch(match);
    return { status: 'SUCCESSFUL', data: newmatch };
  }

  public async findAllMatches(inProgress: string | undefined): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAllMatches();
    if (!allMatches) return { status: 'NOT_FOUND', data: { message: 'No match found' } };
    if (inProgress) {
      const filteredMatches = allMatches
        .filter((match) => match.inProgress.toString() === inProgress);
      return { status: 'SUCCESSFUL', data: filteredMatches };
    }
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  // public async filterMatches(inProgress: string | undefined): Promise<ServiceResponse<IMatch[]>> {
  //   const allMatches = await this.matchModel.findAllMatches();
  //   if (!allMatches) return { status: 'NOT_FOUND', data: { message: 'No match found' } };
  //   const filteredMatches = allMatches
  //     .filter((match) => match.inProgress.toString() === inProgress);
  //   return { status: 'SUCCESSFUL', data: filteredMatches };
  // }
}
