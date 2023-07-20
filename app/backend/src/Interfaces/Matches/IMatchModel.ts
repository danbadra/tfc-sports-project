import IMatch from './IMatch';

export interface IMatchModel {
  createMatch(data: Partial<IMatch>): Promise<IMatch>,
  findAllMatches(): Promise<IMatch[]>,
  finishMatch(id: number): Promise<string>,
}
