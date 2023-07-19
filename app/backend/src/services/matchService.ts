import IMatch from '../Interfaces/Matches/IMatch';
import MatchModel from '../models/matchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchsService {
  protected matchModel = new MatchModel();

  public async createMatch(match: IMatch): Promise<ServiceResponse<IMatch>> {
    const newmatch = await this.matchModel.createMatch(match);
    return { status: 'SUCCESSFUL', data: newmatch };
  }

  public async findAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatchs = await this.matchModel.findAllMatches();
    if (!allMatchs) return { status: 'NOT_FOUND', data: { message: 'No match found' } };
    return { status: 'SUCCESSFUL', data: allMatchs };
  }

  public async findMatchById(id: string): Promise<ServiceResponse<IMatch>> {
    const idNumber = Number(id);
    const match = await this.matchModel.findMatchById(idNumber);
    if (!match) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    return { status: 'SUCCESSFUL', data: match };
  }
}
