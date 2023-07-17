import ITeam from '../Interfaces/Teams/ITeam';
import TeamModel from '../models/teamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  protected teamModel = new TeamModel();

  public async createTeam(team: ITeam): Promise<ServiceResponse<ITeam>> {
    const newteam = await this.teamModel.create(team);
    return { status: 'SUCCESSFUL', data: newteam };
  }

  public async findAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    if (!allTeams) return { status: 'NOT_FOUND', data: { message: 'No team found' } };
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async findTeamById(id: string): Promise<ServiceResponse<ITeam>> {
    const idNumber = Number(id);
    const team = await this.teamModel.findById(idNumber);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
