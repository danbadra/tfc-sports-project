import IMatch from './IMatch';
import { Update } from '../../types/updateType';
import { NewEntity } from '../INewEntity';

export interface IMatchModel {
  createMatch(newMatch: NewEntity<IMatch>): Promise<IMatch>,
  findAllMatches(): Promise<IMatch[]>,
  finishMatch(id: number): Promise<string>,
  updateMatch(id: number, update: Update): Promise<string>
}
