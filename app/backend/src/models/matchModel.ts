import SequelizeTeam from '../database/models/SequelizeTeam';
import { IMatchModel } from '../Interfaces/Matches/IMatchModel';
import IMatch from '../Interfaces/Matches/IMatch';
import SequelizeMatch from '../database/models/SequelizeMatch';
// import { NewEntity } from '../Interfaces/index';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async createMatch(data: IMatch): Promise<IMatch> {
    const dbData = await this.model.create(data);
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async findAllMatches(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return dbData;
  }

  async findMatchById(id: IMatch['id']): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
