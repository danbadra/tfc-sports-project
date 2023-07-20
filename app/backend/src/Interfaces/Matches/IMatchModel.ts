import IMatch from './IMatch';
import { Update } from '../../types/updateType';

export interface IMatchModel {
  createMatch(data: Partial<IMatch>): Promise<IMatch>,
  findAllMatches(): Promise<IMatch[]>,
  finishMatch(id: number): Promise<string>,
  updateMatch(id: number, update: Update): Promise<string>
}
