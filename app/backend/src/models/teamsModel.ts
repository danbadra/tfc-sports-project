import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import ITeam from '../Interfaces/Teams/ITeam';
import SequelizeTeam from '../database/models/SequelizeTeam';
// import { NewEntity } from '../Interfaces/index';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async create(data: ITeam): Promise<ITeam> {
    const dbData = await this.model.create(data);
    const { id, teamName }: ITeam = dbData;
    return { id, teamName };
  }

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;
    const { teamName }: ITeam = dbData;
    return { id, teamName };
  }
}
