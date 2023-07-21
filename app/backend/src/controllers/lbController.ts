import { Request, Response } from 'express';
import AwayLeaderboardsService from '../services/awayLbService';
import HomeLeaderboardService from '../services/homeLbService';

export default class LeaderboardController {
  constructor(
    private homeLbService = new HomeLeaderboardService(),
    private awayLbService = new AwayLeaderboardsService(),
  ) { }

  public async homeTeamsLb(req: Request, res: Response): Promise<Response> {
    const result = await this.homeLbService.sortHomeLb();

    return res.status(200).json(result);
  }

  public async awayTeamsLb(req: Request, res: Response): Promise<Response> {
    const result = await this.awayLbService.sortAwayLb();

    return res.status(200).json(result);
  }
}
