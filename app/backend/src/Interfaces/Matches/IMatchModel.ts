import IMatch from './IMatch';

export interface IMatchModel {
  createMatch(data: Partial<IMatch>): Promise<IMatch>,
  findAllMatches(): Promise<IMatch[]>,
  findMatchById(id: IMatch['id']): Promise<IMatch | null>
}
