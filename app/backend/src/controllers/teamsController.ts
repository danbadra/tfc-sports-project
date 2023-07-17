import { Request, Response } from 'express';
import TeamService from '../services/teamsService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async createTeam(req: Request, res: Response) {
    const serviceResponse = await this.teamService.createTeam(req.body);
    res.status(201).json(serviceResponse.data);
  }

  public async findAllTeams(req: Request, res: Response) {
    const serviceResponse = await this.teamService.findAllTeams();
    if (serviceResponse.status !== 'SUCCESSFUL') return res.status(400).json(serviceResponse.data);
    res.status(200).json(serviceResponse.data);
  }

  public async findTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamService.findTeamById(id);
    if (serviceResponse.status !== 'SUCCESSFUL') return res.status(400).json(serviceResponse.data);
    res.status(200).json(serviceResponse.data);
  }
}
