import IMatch from './IMatch';

export interface IMatchModel {
  createMatch(data: Partial<IMatch>): Promise<IMatch>,
  findAllMatches(): Promise<IMatch[]>,
  // filterMatches(inProgress: IMatch['inProgress']): Promise<IMatch | null>
}
